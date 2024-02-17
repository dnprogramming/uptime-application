USE [master]
GO
CREATE LOGIN
  App_Runner_Account
WITH
  PASSWORD = '${database_user_password}';
GO
