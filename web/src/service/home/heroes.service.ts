import { QueryKey } from './../../../node_modules/@tanstack/query-core/src/types';
import { useSuspenseQuery } from "@tanstack/react-query";
import { api } from "../axios";

export const heroesKey = (): QueryKey => ["heroes-list"]

export const useHeroes = () => {
  return useSuspenseQuery<HomeApi.HeroesResponse[]>({
    queryFn: () => api.get("/heroes").then(res => res.data),
    queryKey: heroesKey(),
  });
};
