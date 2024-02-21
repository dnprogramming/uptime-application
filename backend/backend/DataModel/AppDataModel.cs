namespace backend.DataModel;

public class AppDataModel
{
    public int Id { get; set; }
    public string Appname { get; set; } = null!;
    public string Responsibility { get; set; } = null!;
    public int CriticalityId { get; set; }
    public string CriticalityLevel { get; set; } = null!;
    public int Currentappstatus { get; set; }
    public DateTime Lastupdated { get; set; }
}