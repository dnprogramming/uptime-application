namespace backend.Utilities;

public class HealthTracker : IHealthTracker
{
	private static async Task<bool> LivenessProbing(string[] hostnames)
	{
		bool live = true;
		foreach (string hostname in hostnames)
		{
			if (!string.IsNullOrWhiteSpace(hostname))
			{
				Ping ping = new();
				PingReply reply = await ping.SendPingAsync(hostname, 100);
				if (reply.Status != IPStatus.Success)
					live = false;
			}
		}
		return live;
	}
	public async Task<bool> LivenessProbe(string[] hostnames)
	{
		return await LivenessProbing(hostnames);
	}
}

