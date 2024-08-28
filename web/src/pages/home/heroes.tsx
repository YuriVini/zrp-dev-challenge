import { Suspense, useState } from "react";
import { HeroForm } from "../../components/hero-form";
import { Modal } from "../../components/modal";
import Navbar from "../../components/nav-bar";
import { useGetHeroes } from "../../service/home/heroes.service";
import { Hero } from "../../components/hero";

export const Heroes = () => {
  const [visible, setVisible] = useState(false);

  const { data: heroes } = useGetHeroes();

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
          className="bg-red-700 transition-colors hover:bg-red-800 text-white py-2 px-6 rounded-full text-lg font-medium"
        >
          Criar Herói
        </button>
      </div>

      <Modal visible={visible} onClose={() => setVisible(false)}>
        <HeroForm submitAction={submitAction} />
      </Modal>

      <Suspense fallback={<>Carregando...</>}>
        <div className="flex flex-wrap items-center justify-center sm:justify-normal gap-6">
          {heroes?.map((hero) => <Hero hero={hero} key={hero?.id} />)}
        </div>
      </Suspense>
    </div>
  );
};
