using Google.Protobuf.WellKnownTypes;
using Grpc.Core;

namespace backend.Services;

public class ReportService : Report.ReportBase
{
    private ILogger<ReportService> _logger;
    private IProcessingReport _report;

    public ReportService(ILogger<ReportService> logger, IProcessingReport report)
    {
        _logger = logger;
        _report = report;
    }

    public override Task<AddApplicationResponse> AddApplication(AddApplicationRequest request, ServerCallContext context)
    {
        return Task.FromResult(_report.AddApplication(request).Result);
    }

    public override Task<UpdateApplicationResponse> UpdateApplication(UpdateApplicationRequest request, ServerCallContext context)
    {
        return Task.FromResult(_report.UpdateApplication(request).Result);
    }

    public override Task<GetApplicationResponse> GetApplication(GetApplicationRequest request, ServerCallContext context)
    {
        return Task.FromResult(_report.GetApplication(request).Result);
    }

    public override async Task GetApplications(GetApplicationsRequest request, IServerStreamWriter<GetApplicationsResponse> responseStream, ServerCallContext context)
    {
        while (!context.CancellationToken.IsCancellationRequested)
        {
            await responseStream.WriteAsync(await _report.GetApplications(request));
            await Task.Delay(TimeSpan.FromMilliseconds(200));
        }
    }
}
