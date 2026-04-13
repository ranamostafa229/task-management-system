"use client";
import { FormField } from "@/components/general/FormField";
import { Button } from "@/components/ui/button";
import { FieldGroup } from "@/components/ui/field";
import { loginSchema } from "@/lib/zodSchemas";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

const LoginForm = () => {
  const { control, handleSubmit } = useForm({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });
  const onSubmit = () => {};

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <FieldGroup>
        <FormField
          control={control}
          label="EMAIL"
          name="email"
          placeholder="yourname@company.com"
          required
          type="email"
        />
        <FormField
          control={control}
          label="PASSWORD"
          name="password"
          placeholder="Enter your password"
          required
          type="password"
        />
        <Button
          type="submit"
          className="font-semibold h-12 rounded-sm cursor-pointer"
          size="lg"
        >
          Log In
        </Button>
      </FieldGroup>
    </form>
  );
};

export default LoginForm;
