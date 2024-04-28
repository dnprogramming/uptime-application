FROM mcr.microsoft.com/dotnet/aspnet:8.0-jammy-chiseled-extra AS base
WORKDIR /app
EXPOSE 80

FROM mcr.microsoft.com/dotnet/sdk:8.0 AS build
WORKDIR /src
COPY ["healthcheck/healthcheck.csproj", "healthcheck/"]
RUN dotnet restore "healthcheck/healthcheck.csproj"
COPY . .
WORKDIR "/src/healthcheck"
RUN dotnet build "healthcheck.csproj" -c Release -o /app/build

FROM build AS publish
RUN dotnet publish "healthcheck.csproj" -c Release -o /app/publish /p:UseAppHost=false

FROM base AS final
WORKDIR /app
COPY --from=publish /app/publish .
ENTRYPOINT ["dotnet", "healthcheck.dll"]
