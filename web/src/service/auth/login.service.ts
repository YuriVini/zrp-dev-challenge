import { useMutation } from "@tanstack/react-query";
import { api } from "../axios";

export const useLogin = () => {
  return useMutation({
    mutationFn: (data: AuthApi.LoginRequest) => api.post<AuthApi.LoginResponse>("/login", data).then(res => res.data),
  });
};
