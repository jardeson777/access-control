'use client';

import Image from "next/image";
import BackgroundLogin from "../../../assets/background-login.png";
import ImageLogin from "../../../assets/image-login.png";
import * as z from "zod";
import { useForm } from "react-hook-form";
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "../../../components/ui/form";
import { Input } from "../../../components/ui/input";
import { Button } from "../../../components/ui/button";
import { zodResolver } from "@hookform/resolvers/zod";
import { AuthenticationService } from "../../../services/authentication.service";
import { useRouter } from "next/navigation";

const formSchema = z.object({
  email: z.string().email("Email inválido"),
  password: z.string().min(8, "Senha deve ter no mínimo 8 caracteres"),
});

type FormSchema = z.infer<typeof formSchema>;

const LoginPage = () => {
  const { login } = AuthenticationService();
  const { replace } = useRouter();
  const form = useForm<FormSchema>({
    defaultValues: {
      email: '',
      password: '',
    },
    resolver: zodResolver(formSchema),
  });

  const onSubmit = async (data: FormSchema) => {
    const output = await login(data);

    if (output.success) {
      replace("/produtos");
    }
  };

  return (
    <main className="w-full min-h-screen flex flex-row">
      <section className="w-1/2 min-h-screen flex justify-center items-center">

        <div className="w-2/3 flex flex-col justify-center items-center h-full">
          <h1 className="py-10 text-center w-full font-semibold text-xl">Login</h1>

          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="w-full flex flex-col gap-5">
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Email</FormLabel>
                    <FormControl>
                      <Input placeholder="email" {...field} />
                    </FormControl>
                    <FormDescription>
                      Digite seu email
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="password"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Senha</FormLabel>
                    <FormControl>
                      <Input type="password" placeholder="********" {...field} />
                    </FormControl>
                    <FormDescription>
                      Digite sua senha
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <div className="flex justify-end">
                <Button type="submit">
                  Entrar
                </Button>
              </div>
            </form>
          </Form>
        </div>

      </section>

      <section
        className="w-1/2 min-h-screen bg-cover bg-center"
        style={{
          backgroundImage: `url(${BackgroundLogin.src})`,
        }}
      >
        <div className="flex justify-center items-center w-full h-full">
          <div className="flex flex-col gap-10 justify-center items-center bg-white bg-opacity-20 h-2/3 w-3/6 rounded-lg">
            <Image src={ImageLogin} alt="login" width={300} />
            <p className="text-white font-medium text-lg">
              Seja bem-vindo!
            </p>
          </div>
        </div>
      </section>
    </main>
  );
}

export default LoginPage;