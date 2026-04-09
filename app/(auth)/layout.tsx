import Logo from "@/components/icons/Logo";

const AuthLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div>
      <div className="flex items-center gap-1.5 pl-10 pt-5">
        <Logo />
        <span className="text-xl font-bold">TASKLY</span>
      </div>
      {children}
    </div>
  );
};

export default AuthLayout;
