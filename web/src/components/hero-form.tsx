import { useForm } from "react-hook-form";
import { Input } from "./input";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { heroesKey, useCreateHero } from "../service/home/heroes.service";
import { useQueryClient } from "@tanstack/react-query";

interface HeroFormProps {
  submitAction: () => void;
}

const schema = z.object({
  name: z.string().min(1, { message: "Campo obrigatório" }),
  image_url: z.string().min(1, { message: "Campo obrigatório" }).url("URL inválida"),
});

export const HeroForm = ({ submitAction }: HeroFormProps) => {
  const [selectedRank, setSelectedRank] = useState("");
  const { control, handleSubmit } = useForm<z.TypeOf<typeof schema>>({
    resolver: zodResolver(schema),
    defaultValues: {
      name: "",
      image_url: "",
    },
  });

  const queryClient = useQueryClient();

  const { mutate } = useCreateHero();

  const onSubmit = handleSubmit((data: z.TypeOf<typeof schema>) => {
    if (selectedRank === "") return alert("Selectione um Rank");
    mutate(
      { rank: selectedRank, ...data },
      {
        onSuccess: (res) => {
          submitAction();
          queryClient.setQueryData<HomeApi.HeroesResponse[]>(heroesKey(), (state) => {
            return [...(state ?? []), { id: res?.id, rank: selectedRank, ...data }];
          });
        },
      }
    );
  });

  return (
    <div className="max-w-[650px] bg-zinc-800 flex flex-col gap-10 py-10 px-16 rounded">
      <p className="text-lg font-bold text-center">Criação de Herói</p>
      <form onSubmit={onSubmit} className="flex flex-col gap-4">
        <Input name="name" placeholder="Nome do Herói" type="text" control={control} />
        <Input name="image_url" type="text" placeholder="URL da Imagem" control={control} />
        <label className="flex flex-row gap-2 mt-4">
          Rank do Herói{""}
          <select
            id="rank-select"
            value={selectedRank}
            className="bg-black px-2"
            onChange={(e) => setSelectedRank(e.target.value)}
          >
            <option value="">--Selectione um rank--</option>
            <option value="S" className="bg-black">
              Rank S
            </option>
            <option value="A" className="bg-black">
              Rank A
            </option>
            <option value="B" className="bg-black">
              Rank B
            </option>
            <option value="C" className="bg-black">
              Rank C
            </option>
          </select>
        </label>
        <button
          type="submit"
          className="flex-1 p-2 mt-8 rounded-full bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500"
        >
          Confirmar
        </button>
      </form>
    </div>
  );
};
