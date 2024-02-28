namespace backend.Interfaces;

public interface IHealthTracker
{
    Task<bool> LivenessProbe(string[] hostnames);
}
