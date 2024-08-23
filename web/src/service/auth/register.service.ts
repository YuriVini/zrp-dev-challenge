import { useMutation } from "@tanstack/react-query";
import { api } from "../axios";

export const useRegister = () => {
  return useMutation({
    mutationFn: (data: AuthApi.RegisterRequest) => api.post("/register", data).then(res => res.data),
  });
};
