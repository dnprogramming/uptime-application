USE [uptimereports]
GO
GRANT SELECT ON SCHEMA::dbo TO app_system;
GO
GRANT INSERT ON SCHEMA::dbo TO app_system;
GO
GRANT UPDATE ON SCHEMA::dbo TO app_system;
GO
GRANT EXECUTE ON SCHEMA::dbo TO app_system;
GO
GRANT CONTROL ON ASYMMETRIC KEY::data_storage to app_system;
GO
