import { QueryKey } from './../../../node_modules/@tanstack/query-core/src/types';
import { useMutation, useSuspenseQuery } from "@tanstack/react-query";
import { api } from "../axios";

export const heroesKey = (): QueryKey => ["heroes-list"]

export const useHeroes = () => {
  return useSuspenseQuery<HomeApi.HeroesResponse[]>({
    queryFn: () => api.get("/heroes").then(res => res.data),
    queryKey: heroesKey(),
  });
};

export const useCreateHero = () => {
  return useMutation({
    mutationFn: (data: HomeApi.CreateHeroRequest) => api.post("/heroes/create", data).then(res => res.data),
  });
};
