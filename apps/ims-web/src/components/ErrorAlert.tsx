import { AuthErrorCodesType } from "@khaled/ims-shared";
import {
  Alert,
  AlertDescription,
  AlertTitle,
} from "@workspace/ui/components/alert";
import { cn } from "@workspace/ui/lib/utils";
import { TriangleAlert } from "lucide-react";

type InputValidationErrorType = {
  name: string;
  errors: {
    field: string;
    messages: string[];
  }[];
};
export type ErrorResponse =
  | { code: AuthErrorCodesType }
  | InputValidationErrorType
  | unknown;
export type ErrorAlertProps = {
  error?: ErrorResponse;
  className?: string;
};

export function ErrorAlert({ error, className }: ErrorAlertProps) {
  let title = "Error";
  let description: React.ReactNode = "Unknown error occurred.";

  if (error && typeof error === "object") {
    // Case 1: { code: ErrorCode }
    if ("code" in error && typeof (error as any).code === "string") {
      title = "Server Error";
      description = <span>{(error as { code: AuthErrorCodesType }).code}</span>;
    }
    // Case 2: InputValidationErrorType
    else if (
      "errors" in error &&
      Array.isArray((error as InputValidationErrorType).errors)
    ) {
      title = (error as InputValidationErrorType).name || "Validation Error";
      description = (
        <ul className="list-disc list-inside space-y-1">
          {(error as InputValidationErrorType).errors.map((err, idx) => (
            <li key={idx}>
              <span className="font-medium">{err.field}: </span>
              {err.messages.join(", ")}
            </li>
          ))}
        </ul>
      );
    }
  }

  return (
    <Alert
      variant="destructive"
      className={cn(
        "bg-destructive/15 border-destructive text-destructive-foreground",
        className
      )}
    >
      <TriangleAlert className="h-5 w-5" />
      <AlertTitle>{title}</AlertTitle>
      <AlertDescription>{description}</AlertDescription>
    </Alert>
  );
}
