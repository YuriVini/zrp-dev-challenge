export as namespace HomeApi;

export interface HeroesResponse {
  id: string;
  name: string;
  rank: string;
  image_url: string;
}

export type CreateHeroRequest = Omit<HeroesResponse, "id">
