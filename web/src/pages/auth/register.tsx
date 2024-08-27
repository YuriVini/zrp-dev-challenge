import { useNavigate } from "react-router-dom";
import { useRegister } from "../../service/auth/register.service";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Input } from "../../components/input";

const schema = z.object({
  name: z.string().min(1, { message: "Campo obrigatório" }),
  password: z.string().min(1, { message: "Campo obrigatório" }),
  confirm_password: z.string().min(1, { message: "Campo obrigatório" }),
  email: z.string().min(1, { message: "Campo obrigatório" }).email({ message: "E-mail inválido" }),
});

export const Register = () => {
  const navigate = useNavigate();

  const { control, handleSubmit } = useForm<z.TypeOf<typeof schema>>({
    resolver: zodResolver(schema),
    defaultValues: {
      name: "",
      email: "",
      password: "",
      confirm_password: "",
    },
  });

  const { mutate } = useRegister();

  const onRegister = (data: z.TypeOf<typeof schema>) => {
    mutate(data, {
      onSuccess: () => {
        navigate("/login");
      },
    });
    return null;
  };
  return (
    <div className="h-screen flex items-center justify-center">
      <div className="max-w-[450px] bg-zinc-800 flex flex-col gap-10 py-10 px-10 rounded">
        <h1 className="text-center">Bem-vindo</h1>
        <form onSubmit={handleSubmit(onRegister)} className="flex w-60 flex-col gap-10">
          <Input
            name="name"
            label="Nome"
            control={control}
            autoComplete="off"
            autoCapitalize="none"
          />
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
            autoCapitalize="none"
          />
          <Input
            required
            label="Confirmar Senha"
            type="password"
            control={control}
            autoComplete="off"
            name="confirm_password"
          />
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
