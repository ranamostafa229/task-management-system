import { CardContent } from "@/components/ui/card";
import AuthHeader from "../_components/AuthHeader";
import AuthFooter from "../_components/AuthFooter";
import LoginForm from "../_components/LoginForm";

const LoginPage = () => {
  return (
    <div>
      <AuthHeader
        title="Welcome Back"
        description="Please enter your details to access your workspace"
      />
      <CardContent>
        <LoginForm />
        <AuthFooter
          description="Don't have an account?"
          linkText="Sign Up"
          href="/signup"
        />
      </CardContent>
    </div>
  );
};

export default LoginPage;
