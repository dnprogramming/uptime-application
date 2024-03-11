string sqlConn = Connections.SQLConnectionString();
string redisConn = Connections.RedisConnectionString();
string securedRedisConn = Connections.SecuredRedisConnectionString();

IDbConnection dbConnection = new SqlConnection(sqlConn);

IConnectionMultiplexer secureRedisConnectionMultiplexer = ConnectionMultiplexer.Connect(securedRedisConn);

EndPointCollection endpointCollection = new()
{
  redisConn.Split(',')[0]
};

var builder = Host.CreateApplicationBuilder(args);
builder.Configuration.AddEnvironmentVariables();
builder.Services.AddDataProtection()
    .SetApplicationName("datasecurity")
    .UseCryptographicAlgorithms(new AuthenticatedEncryptorConfiguration
    {
        EncryptionAlgorithm = EncryptionAlgorithm.AES_256_GCM,
        ValidationAlgorithm = ValidationAlgorithm.HMACSHA512
    })
    .SetDefaultKeyLifetime(TimeSpan.FromDays(30))
    .PersistKeysToStackExchangeRedis(secureRedisConnectionMultiplexer);

var EventLevel = LogEventLevel.Error;
if (!builder.Environment.IsProduction()) EventLevel = LogEventLevel.Information;

var log = new LoggerConfiguration()
          .WriteTo.File(
            $"logs{Path.DirectorySeparatorChar}log.log",
            rollingInterval: RollingInterval.Day,
            retainedFileCountLimit: 21,
            restrictedToMinimumLevel: EventLevel

          )
        .CreateLogger();

builder.Services.AddSingleton(dbConnection);

builder.Services.AddDbContext<UptimereportsContext>((DbContextOptionsBuilder obj) =>
{
    obj.UseSqlServer(sqlConn);
});

builder.Services.AddStackExchangeRedisCache((RedisCacheOptions rco) =>
{
    rco.Configuration = redisConn;
    rco.ConfigurationOptions = new ConfigurationOptions
    {
        ConnectRetry = 30,
        EndPoints = endpointCollection,
        HeartbeatInterval = TimeSpan.FromSeconds(5),
        KeepAlive = 15
    };
});

builder.Services.AddTransient<IProcessingHealthchecks, ProcessingHealthchecks>();

builder.Services.AddHostedService<Worker>();

var host = builder.Build();
host.Run();

