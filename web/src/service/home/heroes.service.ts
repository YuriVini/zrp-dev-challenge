import { QueryKey } from './../../../node_modules/@tanstack/query-core/src/types';
import { useMutation, useSuspenseQuery } from "@tanstack/react-query";
import { api } from "../axios";

export const heroesKey = (): QueryKey => ["heroes-list"]

export const useGetHeroes = () => {
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

export const useUpdateHero = () => {
  return useMutation({
    mutationFn: (data: { heroId: string, hero: HomeApi.CreateHeroRequest }) => api.patch(`/heroes/${data?.heroId}`, data?.hero).then(res => res.data),
  });
};

export const useDeleteHero = () => {
  return useMutation({
    mutationFn: (heroId: string) => api.delete(`/heroes/${heroId}`).then(res => res.data),
  });
};
