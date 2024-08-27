import { useState } from "react";
import { Modal } from "./modal";
import { Input } from "./input";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { useQueryClient } from "@tanstack/react-query";
import { heroesKey, useDeleteHero, useUpdateHero } from "../service/home/heroes.service";

interface HeroProps {
  hero: HomeApi.HeroesResponse;
}

const schema = z.object({
  name: z.string().min(1, { message: "Campo obrigatório" }),
  image_url: z.string().min(1, { message: "Campo obrigatório" }).url("URL inválida"),
});

export const Hero = ({ hero }: HeroProps) => {
  const [visible, setVisible] = useState(false);
  const [showUpdateForm, setShowUpdateForm] = useState(false);
  const [selectedRank, setSelectedRank] = useState("");

  const { control, handleSubmit } = useForm<z.TypeOf<typeof schema>>({
    resolver: zodResolver(schema),
    defaultValues: {
      name: hero?.name || "",
      image_url: hero?.image_url || "",
    },
  });

  const queryClient = useQueryClient();

  const { mutate: mutateUpdate } = useUpdateHero();
  const { mutate: mutateDelete } = useDeleteHero();

  const onDelete = () => {
    mutateDelete(hero?.id, {
      onSuccess: () => {
        queryClient.setQueryData<HomeApi.HeroesResponse[]>(heroesKey(), (state) =>
          state?.filter((item) => item?.id !== hero?.id)
        );
      },
    });
    setVisible(false);
    setShowUpdateForm(false);
  };

  const onUpdate = handleSubmit((data: z.TypeOf<typeof schema>) => {
    if (selectedRank === "") return alert("Selectione um Rank");
    mutateUpdate(
      { heroId: hero?.id, hero: { rank: selectedRank, ...data } },
      {
        onSuccess: () => {
          queryClient.setQueryData<HomeApi.HeroesResponse[]>(heroesKey(), (state) =>
            state?.map((item) =>
              item?.id === hero?.id ? { ...item, ...data, rank: selectedRank } : item
            )
          );
        },
      }
    );

    setVisible(false);
    setShowUpdateForm(false);
  });

  return (
    <>
      <div onClick={() => setVisible(true)} className="my-2 flex flex-col items-center gap-2">
        <div className="p-0.5 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 rounded-full">
          <img
            src={hero?.image_url}
            alt={hero?.name}
            className="w-24 h-24 object-cover rounded-full"
          />
        </div>
        <div className="ml-4">
          <h3>Nome: {hero?.name}</h3>
          <p>Rank: {hero?.rank}</p>
        </div>
      </div>

      <Modal visible={visible} onClose={() => setVisible(false)}>
        <div className="max-w-[650px] bg-zinc-800 flex flex-col items-center gap-10 py-10 px-16 rounded">
          <img
            src={hero?.image_url}
            alt={`${hero?.name} Modal`}
            className="w-24 h-24 object-cover rounded-full"
          />
          <p>{hero?.name}</p>

          {showUpdateForm && (
            <form onSubmit={onUpdate} className="flex flex-col gap-4">
              <Input name="name" placeholder="Nome do Herói" type="text" control={control} />
              <Input name="image_url" type="text" placeholder="URL da Imagem" control={control} />
              <label className="flex flex-row gap-2 mt-4">
                Rank do Herói
                <select
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

              <button type="submit" className="w-full py-2 px-8 mt-4 rounded-full bg-indigo-600">
                Atualizar
              </button>
            </form>
          )}

          {!showUpdateForm && (
            <>
              <button
                type="button"
                onClick={() => setShowUpdateForm(true)}
                className="w-full py-2 px-8 mt-4 rounded-full bg-indigo-600"
              >
                Atualizar
              </button>

              <button
                type="button"
                onClick={onDelete}
                className="w-full py-2 px-8 rounded-full bg-red-600"
              >
                Excluir
              </button>
            </>
          )}
        </div>
      </Modal>
    </>
  );
};
