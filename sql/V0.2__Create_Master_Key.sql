USE [master]
GO
CREATE MASTER KEY ENCRYPTION BY PASSWORD = '${master_key_password}';
GO