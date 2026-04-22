"use client";
import { FormField } from "@/components/general/FormField";
import { Button, buttonVariants } from "@/components/ui/button";
import { Field, FieldGroup } from "@/components/ui/field";
import { tryCatch } from "@/hooks/try-catch";
import { loginSchema, LoginSchemaType } from "@/lib/zodSchemas";
import { zodResolver } from "@hookform/resolvers/zod";
import { useTransition } from "react";
import { Controller, useForm } from "react-hook-form";
import { LoginAction } from "../login/action";
import { toast } from "sonner";
import { Loader2 } from "lucide-react";
import { useRouter } from "next/navigation";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import Link from "next/link";

const LoginForm = () => {
  const [isPending, startTransition] = useTransition();
  const router = useRouter();
  const { control, handleSubmit } = useForm({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
      rememberMe: false,
    },
  });
  const onSubmit = async (data: LoginSchemaType) => {
    startTransition(async () => {
      const { data: result, error } = await tryCatch(LoginAction(data));
      if (error) {
        console.error("Login failed:", error);
        toast.error("An error occurred during login. Please try again.");
      }
      if (result?.status === "success") {
        toast.success(result?.message || "Login successful");
        router.push("/project");
      } else {
        toast.error(
          result?.message ||
            "Failed to login. Please check your credentials and try again.",
        );
      }
    });
  };

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
        <div className="flex">
          <Controller
            name="rememberMe"
            control={control}
            render={({ field }) => (
              <Field orientation="horizontal">
                <Checkbox
                  id="remember-me"
                  checked={field.value}
                  onCheckedChange={field.onChange}
                />
                <Label htmlFor="remember-me">Remember Me</Label>
              </Field>
            )}
          />
          <Link
            href={"/forgot-password"}
            className={buttonVariants({
              variant: "link",
            })}
          >
            Forgot Password?
          </Link>
        </div>
        <Button
          type="submit"
          className="font-semibold h-12 rounded-sm cursor-pointer"
          size="lg"
          disabled={isPending}
        >
          {isPending ? <Loader2 className="mr-2 animate-spin" /> : "Log In"}
        </Button>
      </FieldGroup>
    </form>
  );
};

export default LoginForm;
