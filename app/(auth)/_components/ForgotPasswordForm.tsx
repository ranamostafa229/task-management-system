"use client";
import { FormField } from "@/components/general/FormField";
import { Button } from "@/components/ui/button";
import { FieldGroup } from "@/components/ui/field";
import {
  forgotPasswordSchema,
  ForgotPasswordSchemaType,
} from "@/lib/zodSchemas";
import { zodResolver } from "@hookform/resolvers/zod";
import { Loader2 } from "lucide-react";
import { useTransition } from "react";
import { useForm } from "react-hook-form";

const ForgotPasswordForm = () => {
  const [isPending, startTransition] = useTransition();
  const { control, handleSubmit } = useForm({
    resolver: zodResolver(forgotPasswordSchema),
    defaultValues: {
      email: "",
    },
  });

  const onSubmit = (data: ForgotPasswordSchemaType) => {
    console.log(data);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <FieldGroup>
        <FormField
          control={control}
          name="email"
          type="email"
          label="EMAIL ADDRESS"
          placeholder="Enter your email"
          required
        />
        <Button
          type="submit"
          className="font-semibold h-12 rounded-sm cursor-pointer"
          size="lg"
          disabled={isPending}
        >
          {isPending ? (
            <Loader2 className="mr-2 animate-spin" />
          ) : (
            "Send Reset Link"
          )}
        </Button>
      </FieldGroup>
    </form>
  );
};

export default ForgotPasswordForm;
