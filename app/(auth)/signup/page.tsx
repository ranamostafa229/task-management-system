import { buttonVariants } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import Link from "next/link";
import SignupForm from "./_components/SignupForm";

const SignUp = () => {
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
          <SignupForm />
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
