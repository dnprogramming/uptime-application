USE [uptimereports]
GO
CREATE PROCEDURE dbo.uspInsertAppStatus
  @appname nvarchar(MAX),
  @responsible nvarchar(MAX),
  @record_id int OUTPUT
AS
  INSERT INTO
    [dbo].[appstatus] (appname, responsibility)
  VALUES
    (EncryptByAsymKey(AsymKey_ID('data_storage'), @appname), EncryptByAsymKey(AsymKey_ID('data_storage'), @responsible))

  SET @record_id = SCOPE_IDENTITY()
  RETURN @record_id
GO

CREATE PROCEDURE dbo.uspUpdateAppStatus
  @appid int,
  @appname nvarchar(MAX),
  @responsible nvarchar(MAX),
  @status int
AS
  UPDATE
    [dbo].[appstatus]
  SET
    responsibility = EncryptByAsymKey(AsymKey_ID('data_storage'), @responsible),
    appname = EncryptByAsymKey(AsymKey_ID('data_storage'), @appname),
    currentappstatus = @status,
    lastupdated = GETDATE()
  WHERE
    id = @appid
GO

CREATE PROCEDURE dbo.uspGetAppStatuses
  @passkey nvarchar(MAX)
AS
  SELECT 
    id,
    CAST(DecryptByAsymKey(AsymKey_ID('data_storage'), appname, @passkey) AS nvarchar(MAX)) as appname,
    CAST(DecryptByAsymKey(AsymKey_ID('data_storage'), responsibility, @passkey) AS nvarchar(MAX)) AS responsibility,
    currentappstatus,
    lastupdated
  FROM
    [dbo].[appstatus]
GO

CREATE PROCEDURE dbo.uspGetAppStatus
  @passkey nvarchar(MAX),
  @appid int
AS
  SELECT
    CAST(DecryptByAsymKey(AsymKey_ID('data_storage'), appname, @passkey) AS nvarchar(MAX)) as appname,
    CAST(DecryptByAsymKey(AsymKey_ID('data_storage'), responsibility, @passkey) AS nvarchar(MAX)) AS responsibility,
    currentappstatus,
    lastupdated
  FROM
    [dbo].[appstatus]
  WHERE
    id = @appid
GO
