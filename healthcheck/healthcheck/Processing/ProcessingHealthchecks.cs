namespace healthcheck.Processing;

public class ProcessingHealthchecks : IProcessingHealthchecks
{
	private Dictionary<string, bool> healthStatus = new();
    private const string hostnameCacheKey = "hosts";
    private int pingsProcessed = 0;
    private DistributedCacheEntryOptions _cacheOptions = new();
    private readonly IDistributedCache _cache;
    private readonly IDataProtector _dataProt;
    private UptimereportsContext _db;
    private ILogger<ProcessingHealthchecks> _logger;
    public ProcessingHealthchecks(IDistributedCache cache, UptimereportsContext db,
                               IDataProtectionProvider dataProtProvider,
                               ILogger<ProcessingHealthchecks> logger)
    {
        _cache = cache;
        _db = db;
        _logger = logger;
        _dataProt = dataProtProvider.CreateProtector("hosts");
    }

    private async Task LoadHealthStatusHosts()
    {
        var hosts = await _db.Hosts.ToListAsync();
        healthStatus.Clear();
        foreach(var h in hosts)
        {
            healthStatus[h.Hostname] = true;
        }
    }

    private async Task PingServers(string key, CancellationToken token)
    {
        if (!token.IsCancellationRequested)
        {
            Ping health = new();
            PingReply res = await health.SendPingAsync(key);
            if (res.Status == IPStatus.Success)
                healthStatus[key] = true;
            else
                healthStatus[key] = false;
        }
    }

    private async Task RunningHealthChecks()
    {
        if (healthStatus.Count == 0)
            await LoadHealthStatusHosts();
        while (true)
        {
            CancellationTokenSource cts = new();
            ParallelOptions options = new() { CancellationToken = cts.Token, MaxDegreeOfParallelism = Environment.ProcessorCount };
            await Parallel.ForEachAsync(healthStatus.Keys, options, async (key, ct) =>
            {
                ct.ThrowIfCancellationRequested();
                await PingServers(key, ct);
                ct.ThrowIfCancellationRequested();
            });
        }
    }

    public async Task RunHealthChecks()
    {
        await RunningHealthChecks();
    }
}