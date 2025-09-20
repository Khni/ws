import z from "zod";
export class ValidateIdentifier {
  private emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  private phoneRegex = /^\+?[1-9]\d{7,14}$/; // E.164 format
  private identifierType: "email" | "phone" | null = null;

  superRefine = <T extends { identifier: string }>(
    data: T,
    ctx: z.z.core.$RefinementCtx<T>
  ) => {
    if (this.emailRegex.test(data.identifier)) {
      this.identifierType = "email";
    } else if (this.phoneRegex.test(data.identifier)) {
      this.identifierType = "phone";
    } else {
      ctx.addIssue({
        path: ["identifier"],
        code: "custom",
        message: "Identifier must be a valid email or phone number",
      });
    }
  };
  transform = <T extends { identifier: string }>(data: T) => {
    if (!this.identifierType) {
      throw new Error("IdentifierType is not set");
    }
    return {
      ...data,
      identifierType: this.identifierType,
    };
  };
}
