import { CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

const AuthHeader = ({
  title,
  description,
}: {
  title: string;
  description: string;
}) => {
  return (
    <CardHeader className="text-center pb-6">
      <CardTitle className="text-3xl font-semibold">{title}</CardTitle>
      <CardDescription className="text-sm text-muted-foreground">
        {description}
      </CardDescription>
    </CardHeader>
  );
};

export default AuthHeader;
