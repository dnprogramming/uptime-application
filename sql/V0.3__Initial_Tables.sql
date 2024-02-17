USE [uptimereports]
GO

CREATE TABLE [dbo].[appstatus] (
	id int PRIMARY KEY IDENTITY(1,1) NOT NULL,
  appname nvarchar(MAX) NOT NULL,
  responsibility nvarchar(MAX) NOT NULL,
  currentappstatus int NOT NULL DEFAULT 0,
  lastupdated datetime NOT NULL DEFAULT GETDATE()
)