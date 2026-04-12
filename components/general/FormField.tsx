import { Controller, Control, FieldPath } from "react-hook-form";
import {
  Field,
  FieldDescription,
  FieldError,
  FieldLabel,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { FieldValues } from "react-hook-form";

const INPUT_STYLES = "bg-input rounded-sm text-base py-3.5 px-4 h-12";

interface FormFieldProps<
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>,
> {
  name: TName;
  control: Control<TFieldValues>;
  label: string;
  placeholder?: string;
  description?: string;
  type?: "text" | "email" | "password" | "number" | "tel";
  autoComplete?: string;
  required?: boolean;
}

export const FormField = <
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>,
>({
  name,
  control,
  label,
  placeholder,
  description,
  type = "text",
  autoComplete = "off",
  required = true,
}: FormFieldProps<TFieldValues, TName>) => {
  return (
    <Controller
      name={name}
      control={control}
      render={({ field, fieldState }) => (
        <Field data-invalid={fieldState.invalid}>
          <FieldLabel
            htmlFor={`form-${name}`}
            className="text-muted-foreground"
          >
            {label}
            {!required && <span className="text-gray-500">(Optional)</span>}
          </FieldLabel>
          <Input
            {...field}
            id={`form-${name}`}
            type={type}
            aria-invalid={fieldState.invalid}
            placeholder={placeholder}
            autoComplete={autoComplete}
            className={INPUT_STYLES}
          />
          {description && (
            <FieldDescription className="text-border text-[11px]">
              {description}
            </FieldDescription>
          )}
          {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
        </Field>
      )}
    />
  );
};
