"use client";

import Link from "next/link";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { FaRegEyeSlash, FaRegEye } from "react-icons/fa";
import { Fetchlogin } from "@/services/LoginFetch";
import { useAuthStore } from "@/store/auth";
import { useRouter } from "next/navigation";

// Definición del esquema de validación
const formSchema = z.object({
  email: z.string().email("Introduzca un email válido").min(5).max(50),
  password: z.string().min(8).max(50),
});

const demoAccounts = [
  { label: "John", email: "john_doe@example.com" },
  { label: "Jane", email: "jane_smith@example.com" },
] as const;

const demoPassword = "Demo123!";

// 
interface LoginFormProps {
  title: string;
  extraDiv?: React.ReactNode;
}

const LoginForm: React.FC<LoginFormProps> = ({ title, extraDiv }) => {
  const setToken = useAuthStore((state) => state.setToken);
  const router = useRouter();
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [showPassword, setShowPassword] = useState(false);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    try {
      const resp = await Fetchlogin(values);
      if (resp.success && resp.data?.token && resp.data?.role && resp.data?.id) {
        setToken(resp.data.token, resp.data.role, resp.data.id);  // Guarda el token si existe
        //console.log("Login exitoso, token guardado:", resp.data.token);
        router.push('/') // lo envia al home
      } else {
        setErrorMessage("Error en la autenticación. Verifique sus credenciales.");
      }
    } catch (error) {
      setErrorMessage("Error en la autenticación. Verifique sus credenciales.");
    }
  }

  return (
    <div className="my-8 flex w-full flex-col items-center px-4 drop-shadow-lg shadow-accent-foreground sm:my-14">
      <Form {...form}>
        <h1 className="mb-5 max-w-full rounded-md bg-white p-2 text-center text-2xl font-bold drop-shadow-lg sm:text-display-small-bold">
          {title}
        </h1>
        {extraDiv}
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="flex w-full max-w-[600px] flex-col gap-8 rounded-md bg-[#74ACDF] px-6 py-10 sm:px-12 md:px-20"
        >
          <div className="flex flex-col gap-6">
            <FormItem>
              <FormLabel className="text-white">Email</FormLabel>
              <FormControl>
                <Input
                  {...form.register("email")}
                  className="py-5 px-4 placeholder-gray-400"
                  placeholder="example@example.com"
                />
              </FormControl>
              <FormMessage>{form.formState.errors.email?.message}</FormMessage>
            </FormItem>
            <FormItem>
              <FormLabel className="text-white">Contraseña</FormLabel>
              <div className="relative">
                <FormControl>
                  <Input
                    type={showPassword ? "text" : "password"}
                    {...form.register("password")}
                    className="py-5 px-4 placeholder-gray-400"
                    placeholder="********"
                  />
                </FormControl>
                <button
                  type="button"
                  className="absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-600 mr-5"
                  onClick={() => setShowPassword(!showPassword)}
                  aria-label={
                    showPassword ? "Ocultar contraseña" : "Mostrar contraseña"
                  }
                >
                  {showPassword ? (
                    <FaRegEye size={20} />
                  ) : (
                    <FaRegEyeSlash size={20} />
                  )}
                </button>
              </div>
              <FormMessage>
                {form.formState.errors.password?.message}
              </FormMessage>
            </FormItem>
          </div>
          <div className="flex flex-col gap-8 items-center">
            <Button
              type="submit"
              className="bg-[#F6B40E] hover:bg-[#F7C036] drop-shadow-xl shadow-sm font-bold px-8"
            >
              Iniciar sesión
            </Button>
            <Button asChild className="bg-[#FAFAFA] hover:bg-white text-black drop-shadow-xl text-[14px] shadow-sm font-bold py-6 px-6">
              <Link href="/auth/registro">Crear una cuenta</Link>
            </Button>
            <Link href="/forgot-password">
              <h1 className="text-white font-bold text-[14px]">
                ¿Olvidaste tu contraseña?
              </h1>
            </Link>
          </div>
          <section className="border-t border-white/60 pt-5" aria-labelledby="retrueque-demo-title">
            <h2 id="retrueque-demo-title" className="font-bold text-white">
              Acceso de demostración
            </h2>
            <p className="mt-1 text-sm text-white/90">Contraseña para ambas: {demoPassword}</p>
            <div className="mt-3 grid gap-2 sm:grid-cols-2">
              {demoAccounts.map((account) => (
                <Button
                  key={account.email}
                  type="button"
                  variant="secondary"
                  onClick={() => form.reset({ email: account.email, password: demoPassword })}
                  className="h-auto min-h-10 whitespace-normal px-3 py-2 text-xs"
                >
                  Usar {account.label}
                </Button>
              ))}
            </div>
          </section>
        </form>
      </Form>
    </div>
  );
};

export default LoginForm;
