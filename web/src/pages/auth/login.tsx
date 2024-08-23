import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { z } from "zod";
import { Input } from "../../components/input";
import { useLogin } from "../../service/auth/login.service";

const schema = z.object({
  password: z.string().min(1, { message: "Campo obrigatório" }),
  email: z.string().min(1, { message: "Campo obrigatório" }).email({ message: "E-mail inválido" }),
});

export const Login = () => {
  const navigate = useNavigate();

  const { control, handleSubmit } = useForm<z.TypeOf<typeof schema>>({
    resolver: zodResolver(schema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const { mutate } = useLogin();

  const onLogin = (data: z.TypeOf<typeof schema>) => {
    mutate(data, {
      onSuccess: (res) => {
        localStorage.setItem("authToken", res?.token);
        navigate("/home");
      },
    });
    return null;
  };

  return (
    <div className="h-screen flex items-center justify-center px-4">
      <div className="max-w-[450px] bg-zinc-800 flex flex-col gap-10 py-10 px-16 rounded">
        <h1 className="text-center">Bem-vindo</h1>
        <form onSubmit={handleSubmit(onLogin)} className="flex flex-col gap-4">
          <Input
            name="email"
            label="Email"
            control={control}
            autoComplete="off"
            autoCapitalize="none"
          />
          <Input
            required
            label="Senha"
            name="password"
            type="password"
            control={control}
            autoComplete="off"
          />
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
