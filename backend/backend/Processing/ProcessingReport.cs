namespace backend.Processing;

public class ProcessingReport : IProcessingReport
{
    private const string cacheKey = "report";
    private const string hostnameCacheKey = "hosts";
    private DistributedCacheEntryOptions _cacheOptions = new();
    private readonly IDistributedCache _cache;
    private readonly IDataProtector _dataProt;
    private UptimereportsContext _db;
    private ILogger<ProcessingReport> _logger;
    private Dictionary<int, string> criticalityDictionary = new();
    public ProcessingReport(IDistributedCache cache, UptimereportsContext db,
                               IDataProtectionProvider dataProtProvider,
                               ILogger<ProcessingReport> logger)
    {
        _cache = cache;
        _db = db;
        _logger = logger;
        _dataProt = dataProtProvider.CreateProtector("Reports");
    }

    private async Task LoadCriticalityLevel()
    {
        var criticality = await _db.Criticalities.ToListAsync();
        foreach (Criticality c in criticality)
        {
            if (!criticalityDictionary.ContainsKey(c.Id))
                criticalityDictionary.Add(c.Id, c.CriticalityLevel);
        }
    }

    private async Task<List<string>> GetHostnames(int Appid)
    {
        List<string> hosts = new();
        try
        {
            string truehostcachekey = $"{hostnameCacheKey}{Appid}";
            if (_cache.Get(truehostcachekey) != null)
            {
                var result = _cache.Get(truehostcachekey);
                var jsonString = Encoding.UTF8.GetString(result);
                var results = JsonConvert.DeserializeObject<List<string>>(jsonString);
                foreach (string r in results)
                {
                    string decryptedhostname = _dataProt.Unprotect(r);
                    hosts.Add(decryptedhostname);
                }
            }
            else
            {
                var hostnames = await _db.Hosts.Where(e => e.AppId == Appid).Select(e => e.Hostname).ToListAsync();
                foreach (string r in hostnames)
                {
                    string decryptedhostname = _dataProt.Unprotect(r);
                    hosts.Add(decryptedhostname);
                }
                _cache.Remove(truehostcachekey);
                var jsonString = JsonConvert.SerializeObject(hosts);
                var byteArray = Encoding.UTF8.GetBytes(jsonString);
                _cacheOptions.SetAbsoluteExpiration(DateTimeOffset.Now.AddDays(7));
                _cache.Set(truehostcachekey, byteArray, _cacheOptions);
            }
        }
        catch (Exception ex)
        {
            _logger.LogError($"Error has occurred in GetHostnames: {ex.Message}");
        }
        return hosts;
    }

    private async Task<List<ApplicationInformation>> GetApplicationsEncryptedForApi()
    {
        List<ApplicationInformation> applications = new();
        await LoadCriticalityLevel();
        try
        {
            if (_cache.Get(cacheKey) != null)
            {
                var result = _cache.Get(cacheKey);
                var jsonString = Encoding.UTF8.GetString(result);
                var results = JsonConvert.DeserializeObject<List<ApplicationInformation>>(jsonString);
                foreach (var r in results)
                {
                    string decryptedappname = _dataProt.Unprotect(r.Appname);
                    string decryptedresponsibility = _dataProt.Unprotect(r.Responsiblepersonname);
                    List<string> hostnames = await GetHostnames(r.Appid);
                    ApplicationInformation app = new()
                    {
                        Appid = r.Appid,
                        Appname = decryptedappname,
                        Appstatus = r.Appstatus,
                        Lastupdated = r.Lastupdated,
                        Criticalityid = r.Criticalityid,
                        Criticalitylevel = criticalityDictionary.GetValueOrDefault(r.Criticalityid),
                        Responsiblepersonname = decryptedresponsibility,
                    };
                    app.Hostname.AddRange(hostnames);
                    applications.Add(app);
                }
            }
            else
            {
                var appData = await _db.Appstatuses.ToListAsync();
                foreach (var r in appData)
                {

                    string decryptedappname = _dataProt.Unprotect(r.Appname);
                    string decryptedresponsibility = _dataProt.Unprotect(r.Responsibility);
                    ApplicationInformation app = new()
                    {
                        Appid = r.Id,
                        Appname = decryptedappname,
                        Appstatus = r.Currentappstatus,
                        Criticalityid = r.CriticalityId,
                        Criticalitylevel = criticalityDictionary.GetValueOrDefault(r.CriticalityId),
                        Lastupdated = Timestamp.FromDateTime(r.Lastupdated),
                        Responsiblepersonname = decryptedresponsibility
                    };
                    applications.Add(app);
                }
                await CacheUpdate();
            }
        }
        catch (Exception ex)
        {
            _logger.LogError($"A Error has occurred in GetApplications Encrypted API: {ex.Message}");
        }
        return applications.OrderByDescending(e => e.Appstatus).ThenBy(e => e.Criticalityid).ThenBy(e => e.Appname).ToList();
    }

    private async Task CacheUpdate()
    {
        List<ApplicationInformation> applications = new();
        await LoadCriticalityLevel();
        try
        {
            var appData = await _db.Appstatuses.ToListAsync();
            foreach (var r in appData)
            {
                ApplicationInformation app = new()
                {
                    Appid = r.Id,
                    Appname = r.Appname,
                    Appstatus = r.Currentappstatus,
                    Criticalityid = r.CriticalityId,
                    Criticalitylevel = criticalityDictionary.GetValueOrDefault(r.CriticalityId),
                    Lastupdated = Timestamp.FromDateTime(r.Lastupdated.ToUniversalTime()),
                    Responsiblepersonname = r.Responsibility
                };
                applications.Add(app);
            }
            if (applications.Count() > 0)
            {
                _cache.Remove(cacheKey);
                var jsonString = JsonConvert.SerializeObject(applications);
                var byteArray = Encoding.UTF8.GetBytes(jsonString);
                _cacheOptions.SetAbsoluteExpiration(DateTimeOffset.Now.AddDays(7));
                _cache.Set(cacheKey, byteArray, _cacheOptions);
            }
        }
        catch (Exception ex)
        {
            _logger.LogError($"A Error has occurred in Cache Update: {ex.Message}");
        }
    }
    private async Task InsertingHostnamesEncrypted(List<string> hostnames, int Appid)
    {
        List<string> encrypted = new();
        foreach (string h in hostnames)
        {
            string encryptedhostname = _dataProt.Protect(h);
            encrypted.Add(encryptedhostname);
        }
        foreach (string e in encrypted)
        {
            Host newHost = new()
            {
                AppId = Appid,
                Hostname = e
            };
            await _db.Hosts.AddAsync(newHost);
            await _db.SaveChangesAsync();
        }
    }
    private async Task UpdatingHostnamesEncrypted(List<string> hostnames, int Appid)
    {
        List<string> encrypted = new();
        foreach (string h in hostnames)
        {
            string encryptedhostname = _dataProt.Protect(h);
            encrypted.Add(encryptedhostname);
        }
        _db.Hosts.RemoveRange(await _db.Hosts.Where(e => e.AppId == Appid).ToListAsync());
        await _db.SaveChangesAsync();
        foreach (string e in encrypted)
        {
            Host newHost = new()
            {
                AppId = Appid,
                Hostname = e
            };
            await _db.Hosts.AddAsync(newHost);
            await _db.SaveChangesAsync();
        }
    }
    private async Task<bool> InsertApplicationEncrypted(AddApplicationRequest request)
    {
        bool success = false;
        try
        {
            var appname = _dataProt.Protect(request.Appname.Trim());
            var responsiblename = _dataProt.Protect(request.Responsiblepersonname.Trim());
            Appstatus appstatus = new()
            {
                Appname = appname,
                Responsibility = responsiblename,
                CriticalityId = request.Criticalityid
            };
            await _db.Appstatuses.AddAsync(appstatus);
            await _db.SaveChangesAsync();
            if (request.Hostname.Count() > 0)
                await InsertingHostnamesEncrypted(request.Hostname.ToList(), appstatus.Id);
            success = true;
        }
        catch (Exception ex)
        {
            _logger.LogError($"Error has occurred in InsertApplicationEncrypted: {ex.Message}");
        }
        return success;
    }

    private async Task<bool> UpdateApplicationEncrypted(UpdateApplicationRequest request)
    {
        bool success = false;
        try
        {
            var appname = _dataProt.Protect(request.Appname.Trim());
            var responsiblename = _dataProt.Protect(request.Responsiblepersonname.Trim());
            var currentRecord = await _db.Appstatuses.FindAsync(request.Appid);
            currentRecord.Appname = appname;
            currentRecord.CriticalityId = request.Criticalityid;
            currentRecord.Responsibility = responsiblename;
            currentRecord.Currentappstatus = request.Appstatus;
            currentRecord.Lastupdated = DateTime.Now;
            _db.Appstatuses.Update(currentRecord);
            await _db.SaveChangesAsync();
            await UpdatingHostnamesEncrypted(request.Hostname.ToList(), request.Appid);
            success = true;
        }
        catch (Exception ex)
        {
            _logger.LogError($"Error has occurred in UpdateApplicationEncrypted: {ex.Message}");
        }
        return success;
    }

    private async Task<AddApplicationResponse> AddingApplication(AddApplicationRequest request)
	{
        AddApplicationResponse response = new()
        {
            Success = false
        };
        try
        {
            if (string.IsNullOrWhiteSpace(request.Appname) || string.IsNullOrWhiteSpace(request.Responsiblepersonname))
                return response;
            response.Success = await InsertApplicationEncrypted(request);
            await CacheUpdate();
        }
        catch (Exception ex)
        {
            _logger.LogError($"Error Adding Application: {ex.Message}");
        }
        return response;
	}

	private async Task<UpdateApplicationResponse> UpdatingApplication(UpdateApplicationRequest request)
	{
		UpdateApplicationResponse response = new()
        {
            Success = false
        };
        try
        {
            if (request.Appid == 0 ||
                string.IsNullOrWhiteSpace(request.Appname) ||
                request.Appstatus < 0 ||
                string.IsNullOrWhiteSpace(request.Responsiblepersonname))
                return response;
            response.Success = await UpdateApplicationEncrypted(request);
            await CacheUpdate();
        }
        catch (Exception ex)
        {
            _logger.LogError($"Error Updating Application: {ex.Message}");
        }
        return response;
	}

	private async Task<GetApplicationResponse> GettingApplication(GetApplicationRequest request)
	{
        List<ApplicationInformation> Applications = await GetApplicationsEncryptedForApi();
        GetApplicationResponse response = new()
        {
            App = Applications.Where(e => e.Appid == request.Appid).FirstOrDefault()
        };
        return response;
	}

	private async Task<GetApplicationsResponse> GettingApplications()
	{
        List<ApplicationInformation> Applications = await GetApplicationsEncryptedForApi();
        GetApplicationsResponse response = new();
        response.Apps.AddRange(Applications);
        return response;
	}

	public async Task<AddApplicationResponse> AddApplication(AddApplicationRequest request)
	{
		return await AddingApplication(request);
	}

	public async Task<UpdateApplicationResponse> UpdateApplication(UpdateApplicationRequest request)
	{
		return await UpdatingApplication(request);
	}

	public async Task<GetApplicationResponse> GetApplication(GetApplicationRequest request)
	{
		return await GettingApplication(request);
	}

	public async Task<GetApplicationsResponse> GetApplications()
	{
		return await GettingApplications();
	}
}