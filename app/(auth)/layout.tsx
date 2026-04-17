import { Logo } from "@/components/icons/icon";
import { Card } from "@/components/ui/card";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

const AuthLayout = async ({ children }: { children: React.ReactNode }) => {
  const cookiesStore = await cookies();
  const accessToken = cookiesStore.get("access_token")?.value;

  if (accessToken) {
    redirect("/dashboard");
  }
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
