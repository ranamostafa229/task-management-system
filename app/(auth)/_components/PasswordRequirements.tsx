import { Check, X } from "lucide-react";
import { cn } from "@/lib/utils";
import { PASSWORD_REQUIREMENTS } from "@/lib/password-requirements";

interface PasswordRequirementsProps {
  password: string;
}

export const PasswordRequirements = ({
  password,
}: PasswordRequirementsProps) => {
  return (
    <div className="mt-3 p-3 bg-secondary/60  rounded-lg">
      <div className="space-y-2">
        {PASSWORD_REQUIREMENTS.slice(3).map((requirement, index) => {
          const isMet = requirement.test(password);
          return (
            <div key={index} className="flex items-center gap-2">
              <div
                className={cn(
                  "shrink-0 w-4 h-4 rounded-full flex items-center justify-center transition-colors",
                  isMet
                    ? "bg-green-500 text-white"
                    : "bg-gray-300 text-gray-500",
                )}
              >
                {isMet ? (
                  <Check className="w-3 h-3" />
                ) : (
                  <X className="w-3 h-3" />
                )}
              </div>
              <span
                className={cn(
                  "text-[11px] transition-colors",
                  isMet ? "text-green-700" : "text-gray-600",
                )}
              >
                {requirement.label}
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
};
