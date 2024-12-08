import { BaseResponse } from "./base-response.model";

export interface ApiResponse<T> extends BaseResponse {
    data: T;
  }