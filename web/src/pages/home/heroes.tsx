import { useState } from "react";
import { HeroeForm } from "../../components/hero-form";
import { Modal } from "../../components/modal";
import Navbar from "../../components/nav-bar";

const heroesData = [
  {
    rank: "S",
    hero_name: "Nightwing",
    hero_url: "https://cdn.pixabay.com/photo/2022/10/05/04/11/super-hero-7499630_1280.jpg",
  },
  {
    rank: "A",
    hero_name: "Nightwing",
    hero_url: "https://cdn.pixabay.com/photo/2022/10/05/04/11/super-hero-7499630_1280.jpg",
  },
  {
    rank: "B",
    hero_name: "Nightwing",
    hero_url: "https://cdn.pixabay.com/photo/2022/10/05/04/11/super-hero-7499630_1280.jpg",
  },
  {
    rank: "C",
    hero_name: "Nightwing",
    hero_url: "https://cdn.pixabay.com/photo/2022/10/05/04/11/super-hero-7499630_1280.jpg",
  },
  {
    rank: "S",
    hero_name: "Nightwing",
    hero_url: "https://cdn.pixabay.com/photo/2022/10/05/04/11/super-hero-7499630_1280.jpg",
  },
];

export const Heroes = () => {
  const [visible, setVisible] = useState(false);

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
        <HeroeForm />
      </Modal>

      <div className="flex flex-wrap items-center justify-center sm:justify-normal gap-6">
        {heroesData?.map((hero, index) => (
          <div key={index} className="my-2 flex flex-col items-center gap-2">
            <div className="p-0.5 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 rounded-full">
              <img
                src={hero?.hero_url}
                alt={hero?.hero_name}
                className="w-24 h-24 object-cover rounded-full "
              />
            </div>
            <div className="ml-4">
              <h3>Nome: {hero.hero_name}</h3>
              <p>Rank: {hero.rank}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
