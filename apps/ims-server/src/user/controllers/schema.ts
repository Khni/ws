import z from "zod";

export const RegisterBodyschema = z
  .object({
    password: z.string().min(8, "Password must be at least 6 characters long"),
    identifier: z.string(),
    firstName: z.string().min(1, "First name is required"),
    lastName: z.string().min(1, "Last name is required"),
  })
  .superRefine((data, ctx) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const phoneRegex = /^\+?[1-9]\d{7,14}$/; // E.164 format

    if (
      !emailRegex.test(data.identifier) &&
      !phoneRegex.test(data.identifier)
    ) {
      ctx.addIssue({
        path: ["identifier"],
        code: z.ZodIssueCode.custom,
        message: "Identifier must be a valid email or phone number",
      });
    }
  })
  .transform((data) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const identifierType: "email" | "phone" = emailRegex.test(data.identifier)
      ? "email"
      : "phone";

    return {
      ...data,
      identifierType,
    };
  });
