namespace backend.Utilities;

public static class Connections
{
    private static string GenerateSQLConnectionString()
    {
        string? ServerName = Environment.GetEnvironmentVariable("SQLServerHostname");
        string? ServerDatabase = Environment.GetEnvironmentVariable("SQLServerDatabase");
        string? ServerUser = Environment.GetEnvironmentVariable("SQLUserName");
        string? ServerPassword = Environment.GetEnvironmentVariable("SQLPassword");
        string connString = $"Server={ServerName};Database={ServerDatabase};User Id={ServerUser};Password={ServerPassword};Trusted_Connection=True;TrustServerCertificate=true;MultipleActiveResultSets=true;integrated security=false;";
        return connString;
    }

    private static string GenerateRedisConnectionString()
    {
        string? RedisHostName = Environment.GetEnvironmentVariable("RedisHostName");
        string? RedisPortNumber = Environment.GetEnvironmentVariable("RedisPortNumber");
        string? RedisPassword = Environment.GetEnvironmentVariable("RedisPassword");
        string redisConnString = $"{RedisHostName}:{RedisPortNumber},password={RedisPassword}";
        return redisConnString;
    }
    private static string GenerateSecuredRedisConnectionString()
    {
        string? RedisHostName = Environment.GetEnvironmentVariable("SecuredRedisHostName");
        string? RedisPortNumber = Environment.GetEnvironmentVariable("SecuredRedisPortNumber");
        string? RedisPassword = Environment.GetEnvironmentVariable("SecuredRedisPassword");
        string redisConnString = $"{RedisHostName}:{RedisPortNumber},password={RedisPassword}";
        return redisConnString;
    }


    public static string SQLConnectionString()
    {
        return GenerateSQLConnectionString();
    }

    public static string RedisConnectionString()
    {
        return GenerateRedisConnectionString();
    }
    public static string SecuredRedisConnectionString()
    {
        return GenerateSecuredRedisConnectionString();
    }
}