import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { getUser } from "@/data/user/get-user";
import { cookies } from "next/headers";

const Navbar = async () => {
  const cookiesStore = await cookies();
  const accessToken = cookiesStore.get("access_token")?.value ?? "";
  const user = await getUser(accessToken);

  const name = user?.user_metadata?.name;
  return (
    <nav className="border-b w-full flex justify-end">
      <div className="flex items-center gap-2 py-3 pr-6">
        <div className="flex flex-col ">
          <span className="font-semibold text-card-foreground">{name}</span>
          <span className="text-primary font-bold text-[10px] uppercase tracking-widest">
            {user?.user_metadata?.department}
          </span>
        </div>
        <Avatar className="after:border-none">
          <AvatarFallback className="rounded-md bg-ring text-white">
            {name?.split(" ")[0][0].toUpperCase()}
            {name?.split(" ")[1][0]}
          </AvatarFallback>
        </Avatar>
      </div>
    </nav>
  );
};

export default Navbar;
