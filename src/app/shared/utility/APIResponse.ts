// src/app/models/api-response.model.ts
export interface APIResponse<T> {
  timeStamp: string;
  status: number;
  message: string;
  body: T;           // ← Use "body", not "data"
}