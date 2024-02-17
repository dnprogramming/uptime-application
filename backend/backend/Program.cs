string sqlConn = Connections.SQLConnectionString();
string redisConn = Connections.RedisConnectionString();
string securedRedisConn = Connections.SecuredRedisConnectionString();

IDbConnection dbConnection = new SqlConnection(sqlConn);

IConnectionMultiplexer secureRedisConnectionMultiplexer = ConnectionMultiplexer.Connect(securedRedisConn);

EndPointCollection endpointCollection = new()
{
  redisConn.Split(',')[0]
};

var builder = WebApplication.CreateBuilder(args);
builder.Configuration.AddEnvironmentVariables();
builder.Services.AddDataProtection()
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

if (!builder.Environment.IsProduction())
{
    builder.Services.AddGrpc(options =>
    {
        {
            options.Interceptors.Add<ServerLoggerInterceptor>();
            options.EnableDetailedErrors = true;
        }
    });
}
else
    builder.Services.AddGrpc();

builder.Services.AddSingleton(dbConnection);
builder.Services.AddTransient<IEncrypting, Encrypting>();
builder.Services.AddTransient<IProcessingReport, ProcessingReport>();

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

if (!builder.Environment.IsProduction())
{
    builder.Services.AddGrpcReflection();
}

builder.Host.UseSerilog(log);
builder.Services.AddCors(o => o.AddPolicy("AllowAll", builder =>
{
    builder.AllowAnyOrigin()
            .AllowAnyMethod()
            .AllowAnyHeader()
            .WithExposedHeaders("Grpc-Status", "Grpc-Message", "Grpc-Encoding", "Grpc-Accept-Encoding");
}));

var app = builder.Build();

app.UseCors();
app.MapGrpcService<ReportService>().RequireCors("AllowAll");

if (!app.Environment.IsProduction())
{
    app.MapGrpcReflectionService();
}

app.Run();
