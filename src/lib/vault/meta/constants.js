import { FARGATE_PATH } from "./parameters.js";

export const EC2_METADATA_URL = "http://169.254.169.254/latest/";
export const FARGATE_METADATA_URL = `http://169.254.170.2${FARGATE_PATH}`;
export const DEFAULT_WRAP_TTL = "120s";
export const STS_BODY = "Action=GetCallerIdentity&Version=2011-06-15";
export const STS_URL = "https://sts.amazonaws.com/";
