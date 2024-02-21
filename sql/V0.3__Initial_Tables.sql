USE [uptimereports]
GO

CREATE TABLE [dbo].[criticality] (
  id int PRIMARY KEY IDENTITY(1,1) NOT NULL,
  criticalityLevel nvarchar(50) NOT NULL
)

CREATE TABLE [dbo].[appstatus] (
	id int PRIMARY KEY IDENTITY(1,1) NOT NULL,
  appname nvarchar(MAX) NOT NULL,
  responsibility nvarchar(MAX) NOT NULL,
  currentappstatus int NOT NULL DEFAULT 0,
  criticalityId int NOT NULL FOREIGN KEY REFERENCES criticality(id),
  lastupdated datetime NOT NULL DEFAULT GETDATE()
)

CREATE TABLE [dbo].[hosts] (
  id int PRIMARY KEY IDENTITY(1,1) NOT NULL,
  appId int NOT NULL FOREIGN KEY REFERENCES appstatus(id),
  hostname nvarchar(MAX) NOT NULL
)