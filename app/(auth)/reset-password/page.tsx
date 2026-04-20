import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import ResetPasswordForm from "../_components/ResetPasswordForm";
import { AlertTriangleIcon } from "lucide-react";
import AuthHeader from "../_components/AuthHeader";
import { CardContent } from "@/components/ui/card";
import AuthFooter from "../_components/AuthFooter";

const ResetPasswordPage = async ({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}) => {
  const sp = await searchParams;

  if (!sp?.token) {
    return (
      <Alert variant="destructive" className="max-w-md">
        <AlertTriangleIcon className="h-4 w-4" />
        <AlertTitle>Reset link failed</AlertTitle>
        <AlertDescription>
          The reset link is invalid or has expired. Please request a new one.
        </AlertDescription>
      </Alert>
    );
  }
  return (
    <div>
      <AuthHeader
        title="Create a New Password"
        description="Create a new, strong password to secure your workstation access."
        align="left"
      />
      <CardContent>
        <ResetPasswordForm />
        <AuthFooter href="/login" linkText="Back to sign in" />
      </CardContent>
    </div>
  );
};
export default ResetPasswordPage;
