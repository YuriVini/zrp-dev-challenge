import { useForm } from "react-hook-form";
import { Input } from "./input";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";

const schema = z.object({
  "hero-name": z.string().min(1, { message: "Campo obrigatório" }),
  "hero-url": z.string().min(1, { message: "Campo obrigatório" }).url("URL inválida"),
});

export const HeroeForm = () => {
  const [selectedRank, setSelectedRank] = useState("");
  const { control, handleSubmit } = useForm<z.TypeOf<typeof schema>>({
    resolver: zodResolver(schema),
    defaultValues: {
      "hero-name": "",
      "hero-url": "",
    },
  });

  const onSubmit = handleSubmit((data: z.TypeOf<typeof schema>) => {
    console.log("onSubmit", { rank: selectedRank, ...data });
  });

  return (
    <div className="max-w-[650px] bg-zinc-800 flex flex-col gap-10 py-10 px-16 rounded">
      <p className="text-lg font-bold text-center">Criação de Herói</p>
      <form onSubmit={onSubmit} className="flex flex-col gap-4">
        <Input name="hero-name" placeholder="Nome do Herói" type="text" control={control} />
        <Input name="hero-url" type="text" placeholder="URL da Imagem" control={control} />
        <label className="flex flex-row gap-2 mt-4">
          Rank do Herói
          <select
            value={selectedRank}
            className="bg-black px-2"
            onChange={(e) => setSelectedRank(e.target.value)}
          >
            <option value="s" className="bg-black">
              Rank S
            </option>
            <option value="a" className="bg-black">
              Rank A
            </option>
            <option value="b" className="bg-black">
              Rank B
            </option>
            <option value="c" className="bg-black">
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
