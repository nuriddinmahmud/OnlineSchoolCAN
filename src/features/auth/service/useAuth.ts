import { useMutation, useQueryClient } from "@tanstack/react-query";
import { api } from "../../../shared/lib/axios";
import { ILoginBody, IRegisterBody } from "../../../shared/types";
import { auth } from "../../keys";

export const useAuth = () => {
  const queryClient = useQueryClient();

  const register = useMutation({
    mutationFn: (body: IRegisterBody) =>
      api.post("/auth/register", body).then((res) => res.data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [auth] });
    },
  });

  const login = useMutation({
    mutationFn: (body: ILoginBody) =>
      api.post("/auth/login", body).then((res) => res.data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [auth] });
    },
  });

  return { register, login };
};
