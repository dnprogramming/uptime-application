USE [uptimereports]
GO
CREATE ASYMMETRIC KEY data_storage
  WITH ALGORITHM = RSA_2048
  ENCRYPTION BY PASSWORD = '${asymmetric_password}';   
GO
