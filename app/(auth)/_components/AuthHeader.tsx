import { CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

const AuthHeader = ({
  title,
  description,
  align = "center",
}: {
  title: string;
  description: string;
  align?: "center" | "left";
}) => {
  return (
    <CardHeader className={`text-${align} pb-7`}>
      <CardTitle className="text-3xl font-semibold">{title}</CardTitle>
      <CardDescription className="text-sm text-muted-foreground">
        {description}
      </CardDescription>
    </CardHeader>
  );
};

export default AuthHeader;
