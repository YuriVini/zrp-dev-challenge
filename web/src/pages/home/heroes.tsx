import { Suspense, useState } from "react";
import { HeroForm } from "../../components/hero-form";
import { Modal } from "../../components/modal";
import Navbar from "../../components/nav-bar";
import { useHeroes } from "../../service/home/heroes.service";

export const Heroes = () => {
  const [visible, setVisible] = useState(false);

  const { data: heroes } = useHeroes();

  const submitAction = () => {
    setVisible(false);
  };

  return (
    <div className="p-4">
      <Navbar />
      <div className="flex justify-end mb-6 mt-16">
        <button
          type="button"
          onClick={() => setVisible(true)}
          className="bg-red-700 transition-colors hover:bg-red-800 text-white py-2 px-6 rounded-full"
        >
          <p className="text-sm font-medium">Criar Herói</p>
        </button>
      </div>

      <Modal visible={visible} onClose={() => setVisible(false)}>
        <HeroForm submitAction={submitAction} />
      </Modal>

      <Suspense fallback={<>Carregando...</>}>
        <div className="flex flex-wrap items-center justify-center sm:justify-normal gap-6">
          {heroes?.map((hero) => (
            <div key={hero?.id} className="my-2 flex flex-col items-center gap-2">
              <div className="p-0.5 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 rounded-full">
                <img
                  src={hero?.image_url}
                  alt={hero?.name}
                  className="w-24 h-24 object-cover rounded-full "
                />
              </div>
              <div className="ml-4">
                <h3>Nome: {hero?.name}</h3>
                <p>Rank: {hero?.rank}</p>
              </div>
            </div>
          ))}
        </div>
      </Suspense>
    </div>
  );
};
