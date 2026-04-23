"use client";
import { FormField } from "@/components/general/FormField";
import { FieldGroup } from "@/components/ui/field";
import { resetPasswordSchema, ResetPasswordSchemaType } from "@/lib/zodSchemas";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm, useWatch } from "react-hook-form";
import { PasswordRequirements } from "./PasswordRequirements";
import { Button } from "@/components/ui/button";
import { useTransition } from "react";
import { tryCatch } from "@/hooks/try-catch";
import { resetPasswordAction } from "../reset-password/action";
import { toast } from "sonner";
import { useRouter, useSearchParams } from "next/navigation";
import { Loader2 } from "lucide-react";

const ResetPasswordForm = () => {
  const [isPending, startTransition] = useTransition();
  const router = useRouter();
  const sp = useSearchParams();
  const token = sp.get("token") || ""; // Get token from URL search params

  const { control, handleSubmit } = useForm({
    resolver: zodResolver(resetPasswordSchema),
    defaultValues: {
      newPassword: "",
      confirmPassword: "",
    },
  });
  const onSubmit = async (data: ResetPasswordSchemaType) => {
    startTransition(async () => {
      const { data: result, error } = await tryCatch(
        resetPasswordAction(data, token),
      );
      if (error) {
        toast.error(
          "An error occurred during reset password. Please try again.",
        );
        return;
      }
      if (result?.status === "success") {
        toast.success(
          result?.message ||
            "Your password has been updated successfully. You can now log in.",
        );
        setTimeout(() => {
          router.replace("/login");
        }, 3000); // Redirect to login after 3 seconds
      } else {
        toast.error(
          result?.message || "Failed to reset password. Please try again.",
        );
      }
    });
  };
  const password = useWatch({ control, name: "newPassword" });

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <FieldGroup>
        <FormField
          control={control}
          name="newPassword"
          type="password"
          label="NEW PASSWORD"
          placeholder="********"
        />
        <FormField
          control={control}
          name="confirmPassword"
          type="password"
          label="CONFIRM PASSWORD"
          placeholder="********"
        />
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
            "Update Password"
          )}
        </Button>
      </FieldGroup>
    </form>
  );
};

export default ResetPasswordForm;
