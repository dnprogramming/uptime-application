namespace backend.Utilities;

public class Encrypting : IEncrypting
{
    private ILogger<Encrypting> _logger;
    public Encrypting(ILogger<Encrypting> logger)
    {
        _logger = logger;
    }
    private readonly string GettingSPPassKey = Environment.GetEnvironmentVariable("SpPassKey")!;

    public string SPPassKey()
    {
        return GettingSPPassKey;
    }
}