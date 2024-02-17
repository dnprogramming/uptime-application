USE [master]
GO
IF NOT EXISTS(SELECT * FROM sys.databases WHERE name = 'uptimereports')
  BEGIN
    CREATE DATABASE [uptimereports]
  END
GO