"use client";
import { FieldGroup } from "@/components/ui/field";
import { FormField } from "@/components/general/FormField";
import { PasswordRequirements } from "@/app/(auth)/_components/PasswordRequirements";
import { tryCatch } from "@/hooks/try-catch";
import { signupSchema, SignUpSchemaType } from "@/lib/zodSchemas";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { useTransition } from "react";
import { useForm, useWatch } from "react-hook-form";
import { SignUpAction } from "../signup/action";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Loader2 } from "lucide-react";

const SignupForm = () => {
  const [isPending, startTransition] = useTransition();
  const router = useRouter();
  const { control, handleSubmit, reset } = useForm({
    resolver: zodResolver(signupSchema),
    defaultValues: {
      name: "",
      email: "",
      password: "",
      confirmPassword: "",
      jobTitle: "",
    },
  });

  // suscribe only when password changes and not the entire form , now component will re-render only when password field changes
  const password = useWatch({ control, name: "password" });

  const onSubmit = async (data: SignUpSchemaType) => {
    startTransition(async () => {
      const { data: result, error } = await tryCatch(SignUpAction(data));
      if (error) {
        console.error("Signup failed:", error);
        toast.error("An error occurred during signup. Please try again.");
      }
      if (result?.status === "success") {
        toast.success(result?.message || "Signup successful");
        reset();
        router.push("/");
      } else {
        toast.error(result?.message || "Failed to signup. Please try again.");
      }
    });
  };
  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <FieldGroup>
        <FormField
          name="name"
          control={control}
          label="NAME"
          placeholder="Enter your full name"
          description="3-50 characters, letters only."
        />
        <FormField
          name="email"
          control={control}
          label="EMAIL"
          type="email"
          placeholder="yourname@company.com"
        />
        <FormField
          name="jobTitle"
          control={control}
          label="JOB TITLE"
          placeholder="e.g. Project Manager"
          required={false}
        />
        <div className="flex gap-4">
          <FormField
            name="password"
            control={control}
            label="PASSWORD"
            type="password"
            placeholder="Minimum 8 characters"
          />
          <FormField
            name="confirmPassword"
            control={control}
            label="CONFIRM PASSWORD"
            type="password"
            placeholder="Repeat your password"
          />
        </div>
        {<PasswordRequirements password={password} />}
        <Button
          type="submit"
          className="font-semibold h-12 rounded-sm cursor-pointer"
          size="lg"
          disabled={isPending}
        >
          {isPending ? (
            <Loader2 className="mr-2 animate-spin" />
          ) : (
            "Create Account"
          )}
        </Button>
      </FieldGroup>
    </form>
  );
};

export default SignupForm;
