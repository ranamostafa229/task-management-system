import { User } from "./zodSchemas";

export type ApiResponse = {
  status: "success" | "error";
  message: string;
};
export type LoginResponse = {
  status: "success" | "error";
  message: string;
  access_token?: string;
  refresh_token?: string;
  user?: User;
};
