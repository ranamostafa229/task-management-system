"use client";
import { FormField } from "@/components/general/FormField";
import { FieldGroup } from "@/components/ui/field";
import { resetPasswordSchema, ResetPasswordSchemaType } from "@/lib/zodSchemas";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm, useWatch } from "react-hook-form";
import { PasswordRequirements } from "./PasswordRequirements";
import { Button } from "@/components/ui/button";

const ResetPasswordForm = () => {
  const { control, handleSubmit } = useForm({
    resolver: zodResolver(resetPasswordSchema),
    defaultValues: {
      newPassword: "",
      confirmPassword: "",
    },
  });
  const onSubmit = (data: ResetPasswordSchemaType) => {
    console.log(data);
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
          //   disabled={isPending}
        >
          Update Password
        </Button>
      </FieldGroup>
    </form>
  );
};

export default ResetPasswordForm;
