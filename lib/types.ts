export type ApiResponse = {
  status: "success" | "error";
  message: string;
};
export type LoginResponse = {
  status: "success" | "error";
  message: string;
  access_token?: string;
  refresh_token?: string;
  user?: {
    id: string;
    email: string;
    role: string;
    phone: string;
    user_metadata: {
      department: string;
      name: string;
    };
  };
};
