export interface ResponseBodyType {
  code: number;
  statusCode: number;
  timestamp: string;
  message?: string;
  data: any;
  logging?: boolean;
}

export interface SessionType {
  loginId: string;
  loginTime: number;
}
