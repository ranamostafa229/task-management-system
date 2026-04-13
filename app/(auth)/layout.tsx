import Logo from "@/components/icons/Logo";
import { Card } from "@/components/ui/card";

const AuthLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div>
      <div className="flex items-center gap-1.5 pl-10 pt-5">
        <Logo />
        <span className="text-xl font-bold">TASKLY</span>
      </div>
      <div className="flex items-center justify-center min-h-screen ">
        <Card className="max-w-xl w-full mx-auto rounded-md py-12 px-12 mb-4 ">
          {children}
        </Card>
      </div>
    </div>
  );
};

export default AuthLayout;
