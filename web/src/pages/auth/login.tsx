import { useNavigate } from "react-router-dom";

export const Login = () => {
  const navigate = useNavigate();

  const onLogin = () => {
    navigate("/home");
  };

  return (
    <div className="h-screen flex items-center justify-center px-4">
      <div className="max-w-[450px] bg-zinc-800 flex flex-col gap-10 py-10 px-16 rounded">
        <h1 className="text-center">Bem-vindo</h1>
        <form onSubmit={onLogin} className="flex flex-col gap-10">
          <div className="border-b my-2">
            <input
              type="email"
              name="email"
              placeholder="Email"
              autoComplete="email"
              className="flex-1 text-sm p-2 bg-transparent outline-none text-zinc-100 placeholder:text-zinc-500"
            />
          </div>
          <div className="border-b my-2">
            <input
              required
              name="password"
              type="password"
              autoComplete="off"
              placeholder="Senha"
              className="flex-1 text-sm p-2 bg-transparent outline-none text-zinc-100 placeholder:text-zinc-500"
            />
          </div>
          <button
            className="flex-1 p-2 rounded-full bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500"
            type="submit"
          >
            Entrar
          </button>
        </form>

        <div>
          <p className="text-center text-xs">
            Não possui uma conta?{" "}
            <a href="/register" className="font-semibold">
              Cadastre-se
            </a>
          </p>
        </div>
      </div>
    </div>
  );
};
