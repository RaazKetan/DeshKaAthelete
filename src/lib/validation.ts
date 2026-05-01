import { z } from "zod";

// ─── Atomic schemas (compose into form schemas) ──────────────────────────────

export const phoneIN = z
  .string()
  .transform((v) => v.replace(/\s/g, ""))
  .refine((v) => /^\d{10}$/.test(v), "Enter a valid 10-digit mobile number.");

export const password = z
  .string()
  .min(8, "Password must be at least 8 characters.")
  .max(128, "Password is too long.");

export const username = z
  .string()
  .min(3, "At least 3 characters.")
  .max(32, "Username is too long.")
  .regex(/^[a-z0-9_]+$/, "Lowercase letters, numbers, and underscores only.");

export const fullName = z
  .string()
  .trim()
  .min(2, "At least 2 characters.")
  .max(100, "Name is too long.");

export const cityName = z
  .string()
  .trim()
  .min(2, "Enter your city.")
  .max(100, "City is too long.");

export const sport = z.string().min(1, "Select your primary sport.");

export const aadhaarLast4 = z
  .string()
  .optional()
  .transform((v) => (v ? v.trim() : undefined))
  .refine((v) => !v || /^\d{4}$/.test(v), "Must be exactly 4 digits.");

export const sessionFee = z.coerce
  .number()
  .int("Enter whole rupees.")
  .min(5000, "Minimum session fee is ₹5,000.")
  .max(200000, "Maximum session fee is ₹2,00,000.");

export const audienceSize = z.coerce
  .number()
  .int("Audience must be a whole number.")
  .min(1, "Audience must be at least 1.")
  .max(10000, "Audience size seems too large.");

export const otp = z.string().regex(/^\d{6}$/, "Enter the 6-digit OTP.");

export const futureDate = z
  .string()
  .min(1, "Select a date.")
  .refine((v) => {
    const d = new Date(`${v}T00:00:00`);
    if (isNaN(d.getTime())) return false;
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    return d >= today;
  }, "Date must be today or later.");

export const time24 = z.string().regex(/^\d{2}:\d{2}$/, "Select a time.");

// ─── Form schemas (consume in actions + client forms) ────────────────────────

export const athleteSignupSchema = z.object({
  username,
  name: fullName,
  phone: phoneIN,
  password,
  sport,
});

export const athleteLoginSchema = z.object({
  usernameOrPhone: z.string().trim().min(1, "Required."),
  password: z.string().min(1, "Password is required."),
});

export const schoolSignupSchema = z.object({
  name: fullName,
  city: cityName,
  contact: phoneIN,
  password,
});

export const schoolLoginSchema = z.object({
  contact: phoneIN,
  password: z.string().min(1, "Password is required."),
});

export const passwordResetRequestSchema = z.object({
  phone: phoneIN,
});

export const passwordResetCompleteSchema = z.object({
  phone: phoneIN,
  otp,
  newPassword: password,
});

export const onboardingSchema = z.object({
  name: fullName,
  sport,
  aadhaarLastFour: aadhaarLast4,
  federationId: z.string().trim().optional(),
  kheloIndiaId: z.string().trim().optional(),
  pricingSession: sessionFee,
});

export const bookingSchema = z.object({
  type: z.enum(["Talk", "Workshop", "Training"], {
    message: "Pick a session type.",
  }),
  date: futureDate,
  time: time24,
  schoolType: z.string().trim().min(1, "Select your board/type."),
  audienceSize,
  schoolNote: z
    .string()
    .trim()
    .min(10, "Add at least a brief message (10+ characters).")
    .max(2000, "Message is too long."),
});

// ─── Helpers ─────────────────────────────────────────────────────────────────

export type FieldErrors = Record<string, string>;

export type ParseResult<T> =
  | { ok: true; data: T }
  | { ok: false; errors: FieldErrors };

/**
 * Parse a FormData against a Zod schema.
 * Returns the typed data on success or a flat field→message map on failure.
 */
export function parseFormData<S extends z.ZodTypeAny>(
  schema: S,
  formData: FormData,
): ParseResult<z.infer<S>> {
  const obj: Record<string, FormDataEntryValue> = {};
  for (const [key, value] of formData.entries()) {
    obj[key] = value;
  }
  return parseObject(schema, obj);
}

export function parseObject<S extends z.ZodTypeAny>(
  schema: S,
  obj: unknown,
): ParseResult<z.infer<S>> {
  const result = schema.safeParse(obj);
  if (result.success) return { ok: true, data: result.data };
  const errors: FieldErrors = {};
  for (const issue of result.error.issues) {
    const path = issue.path.join(".");
    if (!errors[path]) errors[path] = issue.message;
  }
  return { ok: false, errors };
}

/**
 * Build a validation error with a flat field map. Server actions throw this
 * when client validation is bypassed; clients display per-field messages.
 */
export class ValidationError extends Error {
  fieldErrors: FieldErrors;
  constructor(fieldErrors: FieldErrors, message = "Validation failed.") {
    super(message);
    this.name = "ValidationError";
    this.fieldErrors = fieldErrors;
  }
}

/** Throws ValidationError if parsing fails; returns typed data otherwise. */
export function parseOrThrow<S extends z.ZodTypeAny>(
  schema: S,
  formData: FormData,
): z.infer<S> {
  const result = parseFormData(schema, formData);
  if (!result.ok) throw new ValidationError(result.errors);
  return result.data;
}
