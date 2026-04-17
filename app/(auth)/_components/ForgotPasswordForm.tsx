"use client";
import { FormField } from "@/components/general/FormField";
import { Button } from "@/components/ui/button";
import { FieldGroup } from "@/components/ui/field";
import { tryCatch } from "@/hooks/try-catch";
import {
  forgotPasswordSchema,
  ForgotPasswordSchemaType,
} from "@/lib/zodSchemas";
import { zodResolver } from "@hookform/resolvers/zod";
import { ArrowLeft, CheckCircle2Icon, Loader2 } from "lucide-react";
import { useState, useTransition } from "react";
import { useForm } from "react-hook-form";
import { forgotPasswordAction } from "../forgot-password/action";
import { toast } from "sonner";
import AuthFooter from "./AuthFooter";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { ClockIcon } from "@/components/icons/icon";

const ForgotPasswordForm = () => {
  const [isPending, startTransition] = useTransition();
  const [message, setMessage] = useState("");

  const { control, handleSubmit } = useForm({
    resolver: zodResolver(forgotPasswordSchema),
    defaultValues: {
      email: "",
    },
  });

  const onSubmit = async (data: ForgotPasswordSchemaType) => {
    startTransition(async () => {
      const { data: result, error } = await tryCatch(
        forgotPasswordAction(data),
      );
      if (error) {
        toast.error(
          "An error occurred while sending the reset link. Please try again.",
        );
        return;
      }
      if (result?.status === "success") {
        setMessage(
          "If an account exists with this email, we’ve sent a password reset link.",
        );
        toast.success(result?.message || "Reset link sent successfully.");
      } else {
        toast.error(
          result?.message || "Failed to send reset link. Please try again.",
        );
      }
    });
  };

  return (
    <div>
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
      <AuthFooter
        href="/login"
        linkText="Back to log in"
        icon={<ArrowLeft className="inline text-primary w-5" />}
      />
      {message && (
        <div className="flex flex-col gap-4 pb-4">
          <Alert className="bg-[#82F9BE]/20 border-none py-4">
            <CheckCircle2Icon className=" text-green-100! w-6! h-6! fill-[#005235]" />
            <AlertDescription className="text-[#005235] ">
              {message}
            </AlertDescription>
          </Alert>
          <span className="font-semibold text-[11px] text-center tracking-wide">
            DIDN&apos;T RECEIVE THE EMAIL?
          </span>
          <Button
            className="font-semibold h-12 rounded-sm cursor-pointer
           bg-muted text-muted-foreground "
            size="lg"
            disabled={false}
          >
            {isPending ? (
              <Loader2 className="mr-2 animate-spin" />
            ) : (
              <span className="flex items-center gap-1">
                <ClockIcon />
                Resend in 05:00
              </span>
            )}
          </Button>
        </div>
      )}
    </div>
  );
};

export default ForgotPasswordForm;
