import { ErrorSerializer } from "@khaled/error-handler";

import { ZodError } from "zod";

export const zodErrorSerializer: ErrorSerializer<ZodError> = (error) => {
  // Group issues by field
  const grouped: Record<string, string[]> = {};

  for (const issue of error.issues) {
    const field = issue.path.join(".") || "general";
    if (!grouped[field]) grouped[field] = [];
    grouped[field].push(issue.message);
  }

  return {
    name: "ValidationError",
    errors: Object.entries(grouped).map(([field, messages]) => ({
      field,
      messages,
    })),
  };
};
