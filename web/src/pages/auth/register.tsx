import { useNavigate } from "react-router-dom";

export const Register = () => {
  const navigate = useNavigate();

  const onRegister = () => {
    navigate("/login");
  };

  return (
    <div className="h-screen flex items-center justify-center">
      <div className="max-w-[450px] bg-zinc-800 flex flex-col gap-10 py-10 px-10 rounded">
        <h1 className="text-center">Bem-vindo</h1>
        <form onSubmit={onRegister} className="flex w-60 flex-col gap-10">
          <div className="border-b my-2">
            <input
              required
              type="text"
              name="name"
              placeholder="Nome"
              autoComplete="off"
              className="text-sm p-2 bg-transparent outline-none text-zinc-100 placeholder:text-zinc-500"
            />
          </div>
          <div className="border-b my-2">
            <input
              required
              type="email"
              name="email"
              placeholder="Email"
              autoComplete="email"
              className="text-sm p-2 bg-transparent outline-none text-zinc-100 placeholder:text-zinc-500"
            />
          </div>
          <div className="border-b my-2">
            <input
              required
              name="password"
              type="password"
              autoComplete="off"
              placeholder="Senha"
              className="text-sm p-2 bg-transparent outline-none text-zinc-100 placeholder:text-zinc-500"
            />
          </div>
          <div className="border-b my-2">
            <input
              required
              type="password"
              autoComplete="off"
              name="confirm-password"
              placeholder="Confirmar Senha"
              className="text-sm p-2 bg-transparent outline-none text-zinc-100 placeholder:text-zinc-500"
            />
          </div>
          <button
            className="p-2 rounded-full bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500"
            type="submit"
          >
            Cadastrar
          </button>
        </form>
      </div>
    </div>
  );
};
