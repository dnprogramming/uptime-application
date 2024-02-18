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

    public override async Task<AddApplicationResponse> AddApplication(AddApplicationRequest request, ServerCallContext context)
    {
        return await _report.AddApplication(request);
    }

    public override async Task<UpdateApplicationResponse> UpdateApplication(UpdateApplicationRequest request, ServerCallContext context)
    {
        return await _report.UpdateApplication(request);
    }

    public override async Task<GetApplicationResponse> GetApplication(GetApplicationRequest request, ServerCallContext context)
    {
        return await _report.GetApplication(request);
    }

    public override async Task<GetApplicationsResponse> GetApplications(Empty request, ServerCallContext context)
    {
        return await _report.GetApplications();
    }
}
