namespace backend.Interfaces;

public interface IProcessingReport
{
    Task<AddApplicationResponse> AddApplication(AddApplicationRequest request);

    Task<UpdateApplicationResponse> UpdateApplication(UpdateApplicationRequest request);

    Task<GetApplicationResponse> GetApplication(GetApplicationRequest request);

    Task<GetApplicationsResponse> GetApplications(GetApplicationsRequest request);
}