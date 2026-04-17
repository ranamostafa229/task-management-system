import { CardContent } from "@/components/ui/card";
import SignupForm from "../_components/SignupForm";
import AuthHeader from "../_components/AuthHeader";
import AuthFooter from "../_components/AuthFooter";

const SignUpPage = () => {
  return (
    <>
      <AuthHeader
        title="Create your workspace"
        description="Join the editorial approach to task management."
      />
      <CardContent>
        <SignupForm />
        <AuthFooter
          description="Already have an account?"
          linkText="Log in"
          href="/login"
        />
      </CardContent>
    </>
  );
};

export default SignUpPage;
