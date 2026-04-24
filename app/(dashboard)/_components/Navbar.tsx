import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { getUser } from "@/data/user/get-user";
import { getAccessTokenFromCookies } from "@/lib/auth";

const Navbar = async () => {
  const accessToken = await getAccessTokenFromCookies();
  if (!accessToken) return null;
  const user = await getUser(accessToken);

  const name = user?.user_metadata?.name || "User";
  const nameParts = name.split(" ").filter(Boolean);
  const initials =
    nameParts.length >= 2
      ? `${nameParts[0][0]}${nameParts[nameParts.length - 1][0]}`
      : nameParts[0].slice(0, 2);

  return (
    <nav className="border-b w-full flex justify-end">
      <div className="flex items-center gap-2 py-3 pr-6">
        <div className="flex flex-col ">
          <span className="font-semibold text-card-foreground">{name}</span>
          <span className="text-primary font-bold text-[10px] uppercase tracking-widest">
            {user?.user_metadata?.department || "Member"}
          </span>
        </div>
        <Avatar className="after:border-none">
          <AvatarFallback className="rounded-md bg-ring text-white">
            {initials.toUpperCase() || "US"}
          </AvatarFallback>
        </Avatar>
      </div>
    </nav>
  );
};

export default Navbar;
