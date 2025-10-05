import type { ErrorResponse } from "@khaled/error-handler";
import {
  Alert,
  AlertDescription,
  AlertTitle,
} from "@workspace/ui/components/alert";
import { cn } from "@workspace/ui/lib/utils";
import { TriangleAlert } from "lucide-react";

export type ErrorAlertProps<T extends string> = {
  error?: ErrorResponse<T>;
  className?: string;
  codeTransform?: (code: T) => string | React.ReactNode;
  errorTitle?: string;
  errorDescriptionFallback?: string | React.ReactNode;
};

export function ErrorAlert<T extends string>({
  error,
  className,
  codeTransform,
  errorTitle = "Error",
  errorDescriptionFallback = "Unknown error occurred.",
}: ErrorAlertProps<T>) {
  let title = errorTitle;
  let description: React.ReactNode = errorDescriptionFallback;

  if (error) {
    switch (error.errorType) {
      case "Server": {
        const { code } = error.error;

        description = <span>{codeTransform ? codeTransform(code) : code}</span>;
        break;
      }

      case "InputValidation": {
        const { name, errors } = error.error;

        if (Array.isArray(errors) && errors.length > 0) {
          description = (
            <ul className="list-disc list-inside space-y-1">
              {errors.map((err, idx) => (
                <li key={idx}>
                  <span className="font-medium">{err.field}: </span>
                  {err.messages?.join(", ")}
                </li>
              ))}
            </ul>
          );
        } else {
          description = <span>{errorDescriptionFallback}</span>;
        }
        break;
      }

      default:
        description = <span>{errorDescriptionFallback}</span>;
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
        <AlertDescription className="font-bold">{description}</AlertDescription>
      </Alert>
    );
  } else {
    return null;
  }
}
