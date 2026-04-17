import { CardContent } from "@/components/ui/card";
import AuthHeader from "../_components/AuthHeader";
import AuthFooter from "../_components/AuthFooter";
import { ArrowLeft } from "lucide-react";
import ForgotPasswordForm from "../_components/ForgotPasswordForm";

const ForgotPasswordPage = () => {
  return (
    <div>
      <AuthHeader
        title="Forgot password?"
        description="No worries, we'll send you reset instructions."
        align="left"
      />
      <CardContent>
        <ForgotPasswordForm />
        <AuthFooter
          href="/login"
          linkText="Back to log in"
          icon={<ArrowLeft className="inline text-primary w-5" />}
        />
      </CardContent>
    </div>
  );
};

export default ForgotPasswordPage;
