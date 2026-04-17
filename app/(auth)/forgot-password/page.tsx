import { CardContent } from "@/components/ui/card";
import AuthHeader from "../_components/AuthHeader";
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
      </CardContent>
    </div>
  );
};

export default ForgotPasswordPage;
