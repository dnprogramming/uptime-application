import * as jspb from 'google-protobuf';

import * as google_protobuf_timestamp_pb from 'google-protobuf/google/protobuf/timestamp_pb'; // proto import: "google/protobuf/timestamp.proto"
import * as google_protobuf_empty_pb from 'google-protobuf/google/protobuf/empty_pb'; // proto import: "google/protobuf/empty.proto"

export class AddApplicationRequest extends jspb.Message {
  getAppname(): string;
  setAppname(value: string): AddApplicationRequest;

  getResponsiblepersonname(): string;
  setResponsiblepersonname(value: string): AddApplicationRequest;

  getCriticalityid(): number;
  setCriticalityid(value: number): AddApplicationRequest;

  getHostnameList(): Array<string>;
  setHostnameList(value: Array<string>): AddApplicationRequest;
  clearHostnameList(): AddApplicationRequest;
  addHostname(value: string, index?: number): AddApplicationRequest;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): AddApplicationRequest.AsObject;
  static toObject(
    includeInstance: boolean,
    msg: AddApplicationRequest
  ): AddApplicationRequest.AsObject;
  static serializeBinaryToWriter(
    message: AddApplicationRequest,
    writer: jspb.BinaryWriter
  ): void;
  static deserializeBinary(bytes: Uint8Array): AddApplicationRequest;
  static deserializeBinaryFromReader(
    message: AddApplicationRequest,
    reader: jspb.BinaryReader
  ): AddApplicationRequest;
}

export namespace AddApplicationRequest {
  export type AsObject = {
    appname: string;
    responsiblepersonname: string;
    criticalityid: number;
    hostnameList: Array<string>;
  };
}

export class AddApplicationResponse extends jspb.Message {
  getSuccess(): boolean;
  setSuccess(value: boolean): AddApplicationResponse;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): AddApplicationResponse.AsObject;
  static toObject(
    includeInstance: boolean,
    msg: AddApplicationResponse
  ): AddApplicationResponse.AsObject;
  static serializeBinaryToWriter(
    message: AddApplicationResponse,
    writer: jspb.BinaryWriter
  ): void;
  static deserializeBinary(bytes: Uint8Array): AddApplicationResponse;
  static deserializeBinaryFromReader(
    message: AddApplicationResponse,
    reader: jspb.BinaryReader
  ): AddApplicationResponse;
}

export namespace AddApplicationResponse {
  export type AsObject = {
    success: boolean;
  };
}

export class UpdateApplicationRequest extends jspb.Message {
  getAppid(): number;
  setAppid(value: number): UpdateApplicationRequest;

  getAppname(): string;
  setAppname(value: string): UpdateApplicationRequest;

  getResponsiblepersonname(): string;
  setResponsiblepersonname(value: string): UpdateApplicationRequest;

  getAppstatus(): number;
  setAppstatus(value: number): UpdateApplicationRequest;

  getCriticalityid(): number;
  setCriticalityid(value: number): UpdateApplicationRequest;

  getHostnameList(): Array<string>;
  setHostnameList(value: Array<string>): UpdateApplicationRequest;
  clearHostnameList(): UpdateApplicationRequest;
  addHostname(value: string, index?: number): UpdateApplicationRequest;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): UpdateApplicationRequest.AsObject;
  static toObject(
    includeInstance: boolean,
    msg: UpdateApplicationRequest
  ): UpdateApplicationRequest.AsObject;
  static serializeBinaryToWriter(
    message: UpdateApplicationRequest,
    writer: jspb.BinaryWriter
  ): void;
  static deserializeBinary(bytes: Uint8Array): UpdateApplicationRequest;
  static deserializeBinaryFromReader(
    message: UpdateApplicationRequest,
    reader: jspb.BinaryReader
  ): UpdateApplicationRequest;
}

export namespace UpdateApplicationRequest {
  export type AsObject = {
    appid: number;
    appname: string;
    responsiblepersonname: string;
    appstatus: number;
    criticalityid: number;
    hostnameList: Array<string>;
  };
}

export class UpdateApplicationResponse extends jspb.Message {
  getSuccess(): boolean;
  setSuccess(value: boolean): UpdateApplicationResponse;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): UpdateApplicationResponse.AsObject;
  static toObject(
    includeInstance: boolean,
    msg: UpdateApplicationResponse
  ): UpdateApplicationResponse.AsObject;
  static serializeBinaryToWriter(
    message: UpdateApplicationResponse,
    writer: jspb.BinaryWriter
  ): void;
  static deserializeBinary(bytes: Uint8Array): UpdateApplicationResponse;
  static deserializeBinaryFromReader(
    message: UpdateApplicationResponse,
    reader: jspb.BinaryReader
  ): UpdateApplicationResponse;
}

export namespace UpdateApplicationResponse {
  export type AsObject = {
    success: boolean;
  };
}

export class GetApplicationsRequest extends jspb.Message {
  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): GetApplicationsRequest.AsObject;
  static toObject(
    includeInstance: boolean,
    msg: GetApplicationsRequest
  ): GetApplicationsRequest.AsObject;
  static serializeBinaryToWriter(
    message: GetApplicationsRequest,
    writer: jspb.BinaryWriter
  ): void;
  static deserializeBinary(bytes: Uint8Array): GetApplicationsRequest;
  static deserializeBinaryFromReader(
    message: GetApplicationsRequest,
    reader: jspb.BinaryReader
  ): GetApplicationsRequest;
}

export namespace GetApplicationsRequest {
  export type AsObject = {};
}

export class GetApplicationRequest extends jspb.Message {
  getAppid(): number;
  setAppid(value: number): GetApplicationRequest;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): GetApplicationRequest.AsObject;
  static toObject(
    includeInstance: boolean,
    msg: GetApplicationRequest
  ): GetApplicationRequest.AsObject;
  static serializeBinaryToWriter(
    message: GetApplicationRequest,
    writer: jspb.BinaryWriter
  ): void;
  static deserializeBinary(bytes: Uint8Array): GetApplicationRequest;
  static deserializeBinaryFromReader(
    message: GetApplicationRequest,
    reader: jspb.BinaryReader
  ): GetApplicationRequest;
}

export namespace GetApplicationRequest {
  export type AsObject = {
    appid: number;
  };
}

export class GetApplicationsResponse extends jspb.Message {
  getAppsList(): Array<ApplicationInformation>;
  setAppsList(value: Array<ApplicationInformation>): GetApplicationsResponse;
  clearAppsList(): GetApplicationsResponse;
  addApps(
    value?: ApplicationInformation,
    index?: number
  ): ApplicationInformation;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): GetApplicationsResponse.AsObject;
  static toObject(
    includeInstance: boolean,
    msg: GetApplicationsResponse
  ): GetApplicationsResponse.AsObject;
  static serializeBinaryToWriter(
    message: GetApplicationsResponse,
    writer: jspb.BinaryWriter
  ): void;
  static deserializeBinary(bytes: Uint8Array): GetApplicationsResponse;
  static deserializeBinaryFromReader(
    message: GetApplicationsResponse,
    reader: jspb.BinaryReader
  ): GetApplicationsResponse;
}

export namespace GetApplicationsResponse {
  export type AsObject = {
    appsList: Array<ApplicationInformation.AsObject>;
  };
}

export class GetApplicationResponse extends jspb.Message {
  getApp(): ApplicationInformation | undefined;
  setApp(value?: ApplicationInformation): GetApplicationResponse;
  hasApp(): boolean;
  clearApp(): GetApplicationResponse;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): GetApplicationResponse.AsObject;
  static toObject(
    includeInstance: boolean,
    msg: GetApplicationResponse
  ): GetApplicationResponse.AsObject;
  static serializeBinaryToWriter(
    message: GetApplicationResponse,
    writer: jspb.BinaryWriter
  ): void;
  static deserializeBinary(bytes: Uint8Array): GetApplicationResponse;
  static deserializeBinaryFromReader(
    message: GetApplicationResponse,
    reader: jspb.BinaryReader
  ): GetApplicationResponse;
}

export namespace GetApplicationResponse {
  export type AsObject = {
    app?: ApplicationInformation.AsObject;
  };
}

export class ApplicationInformation extends jspb.Message {
  getAppid(): number;
  setAppid(value: number): ApplicationInformation;

  getAppname(): string;
  setAppname(value: string): ApplicationInformation;

  getResponsiblepersonname(): string;
  setResponsiblepersonname(value: string): ApplicationInformation;

  getAppstatus(): number;
  setAppstatus(value: number): ApplicationInformation;

  getCriticalityid(): number;
  setCriticalityid(value: number): ApplicationInformation;

  getCriticalitylevel(): string;
  setCriticalitylevel(value: string): ApplicationInformation;

  getLastupdated(): google_protobuf_timestamp_pb.Timestamp | undefined;
  setLastupdated(
    value?: google_protobuf_timestamp_pb.Timestamp
  ): ApplicationInformation;
  hasLastupdated(): boolean;
  clearLastupdated(): ApplicationInformation;

  getHostnameList(): Array<string>;
  setHostnameList(value: Array<string>): ApplicationInformation;
  clearHostnameList(): ApplicationInformation;
  addHostname(value: string, index?: number): ApplicationInformation;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): ApplicationInformation.AsObject;
  static toObject(
    includeInstance: boolean,
    msg: ApplicationInformation
  ): ApplicationInformation.AsObject;
  static serializeBinaryToWriter(
    message: ApplicationInformation,
    writer: jspb.BinaryWriter
  ): void;
  static deserializeBinary(bytes: Uint8Array): ApplicationInformation;
  static deserializeBinaryFromReader(
    message: ApplicationInformation,
    reader: jspb.BinaryReader
  ): ApplicationInformation;
}

export namespace ApplicationInformation {
  export type AsObject = {
    appid: number;
    appname: string;
    responsiblepersonname: string;
    appstatus: number;
    criticalityid: number;
    criticalitylevel: string;
    lastupdated?: google_protobuf_timestamp_pb.Timestamp.AsObject;
    hostnameList: Array<string>;
  };
}
