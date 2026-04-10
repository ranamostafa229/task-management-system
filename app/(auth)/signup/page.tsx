"use client";
import { Button, buttonVariants } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Field,
  FieldDescription,
  FieldError,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { signupSchema } from "@/lib/zodSchemas";
import { zodResolver } from "@hookform/resolvers/zod";
import Link from "next/link";
import { Controller, useForm } from "react-hook-form";

const SignUp = () => {
  const { control, handleSubmit } = useForm({
    resolver: zodResolver(signupSchema),
    defaultValues: {
      name: "",
      email: "",
      password: "",
      confirmPassword: "",
      jobTitle: "",
    },
  });
  const onSubmit = (data: any) => {
    console.log(data);
  };
  return (
    <div className="flex items-center justify-center min-h-screen ">
      <Card className="max-w-xl w-full mx-auto rounded-md py-12 px-12 mb-4 ">
        <CardHeader className="text-center ">
          <CardTitle className="text-3xl font-semibold">
            Create your workspace
          </CardTitle>
          <CardDescription className="text-sm text-muted-foreground">
            Join the editorial approach to task management.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit(onSubmit)}>
            <FieldGroup>
              <Controller
                name="name"
                control={control}
                render={({ field, fieldState }) => (
                  <Field data-invalid={fieldState.invalid}>
                    <FieldLabel
                      htmlFor="form-name"
                      className="text-muted-foreground"
                    >
                      NAME
                    </FieldLabel>
                    <Input
                      {...field}
                      id="form-name"
                      aria-invalid={fieldState.invalid}
                      placeholder="Enter your full name"
                      autoComplete="off"
                      className="bg-input rounded-sm text-base py-3.5 px-4 h-12"
                    />
                    <FieldDescription className="text-border text-[11px]">
                      3-50 characters, letters only.
                    </FieldDescription>
                    {fieldState.invalid && (
                      <FieldError errors={[fieldState.error]} />
                    )}
                  </Field>
                )}
              />
              <Controller
                name="email"
                control={control}
                render={({ field, fieldState }) => (
                  <Field data-invalid={fieldState.invalid}>
                    <FieldLabel
                      htmlFor="form-email"
                      className="text-muted-foreground"
                    >
                      EMAIL
                    </FieldLabel>
                    <Input
                      {...field}
                      id="form-email"
                      type="email"
                      aria-invalid={fieldState.invalid}
                      placeholder="yourname@company.com"
                      autoComplete="off"
                      className="bg-input rounded-sm text-base py-3.5 px-4 h-12"
                    />
                    {fieldState.invalid && (
                      <FieldError errors={[fieldState.error]} />
                    )}
                  </Field>
                )}
              />
              <Controller
                name="jobTitle"
                control={control}
                render={({ field, fieldState }) => (
                  <Field data-invalid={fieldState.invalid}>
                    <FieldLabel
                      htmlFor="form-job-title"
                      className="text-muted-foreground"
                    >
                      Job Title (Optional)
                    </FieldLabel>
                    <Input
                      {...field}
                      id="form-job-title"
                      type="text"
                      aria-invalid={fieldState.invalid}
                      placeholder="e.g. Project Manager"
                      autoComplete="off"
                      className="bg-input rounded-sm text-base py-3.5 px-4 h-12"
                    />
                    {fieldState.invalid && (
                      <FieldError errors={[fieldState.error]} />
                    )}
                  </Field>
                )}
              />
              <div className="flex gap-4">
                <Controller
                  name="password"
                  control={control}
                  render={({ field, fieldState }) => (
                    <Field data-invalid={fieldState.invalid}>
                      <FieldLabel
                        htmlFor="form-password"
                        className="text-muted-foreground"
                      >
                        PASSWORD
                      </FieldLabel>
                      <Input
                        {...field}
                        id="form-password"
                        type="password"
                        aria-invalid={fieldState.invalid}
                        placeholder="Minimum 8 characters"
                        autoComplete="off"
                        className="bg-input rounded-sm text-base py-3.5 px-4 h-12"
                      />
                      {fieldState.invalid && (
                        <FieldError errors={[fieldState.error]} />
                      )}
                    </Field>
                  )}
                />
                <Controller
                  name="confirmPassword"
                  control={control}
                  render={({ field, fieldState }) => (
                    <Field data-invalid={fieldState.invalid}>
                      <FieldLabel
                        htmlFor="form-confirm-password"
                        className="text-muted-foreground"
                      >
                        CONFIRM PASSWORD
                      </FieldLabel>
                      <Input
                        {...field}
                        id="form-confirm-password"
                        type="password"
                        aria-invalid={fieldState.invalid}
                        placeholder="Repeat your password"
                        autoComplete="off"
                        className="bg-input rounded-sm text-base py-3.5 px-4 h-12"
                      />
                      {fieldState.invalid && (
                        <FieldError errors={[fieldState.error]} />
                      )}
                    </Field>
                  )}
                />
              </div>
              <Button className="font-semibold h-12 rounded-sm" size="lg">
                Create Account
              </Button>
            </FieldGroup>
          </form>
          <CardFooter className="bg-inherit border-t-0 justify-center">
            <span>
              Already have an account?{" "}
              <Link
                href="/login"
                className={buttonVariants({
                  variant: "link",
                })}
              >
                Log in
              </Link>
            </span>
          </CardFooter>
        </CardContent>
      </Card>
    </div>
  );
};

export default SignUp;
