import { buttonVariants } from "@/components/ui/button";
import { CardFooter } from "@/components/ui/card";
import Link from "next/link";

type AuthFooterProps = {
  description?: string;
  linkText: string;
  href: string;
  icon?: React.ReactNode;
};
const AuthFooter = ({ description, linkText, href, icon }: AuthFooterProps) => {
  return (
    <CardFooter className="bg-inherit border-t-0 justify-center py-10">
      <span>
        {description}
        {icon && icon}
        <Link
          href={href}
          className={buttonVariants({
            variant: "link",
          })}
        >
          {linkText}
        </Link>
      </span>
    </CardFooter>
  );
};

export default AuthFooter;
