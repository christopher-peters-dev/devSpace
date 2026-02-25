import zod, { z } from "zod";
export const createUserDTO = zod.object({
  name: z.string().min(2),
  email: z.email(),
  password: z
    .string()
    .min(8)
    .refine((password) => /[A-Z]/.test(password), {
      message: "Add one uppercase",
    })
    .refine((password) => /[0-9]/.test(password), {
      message: "Add one number",
    })
    .refine(
      (password) => /[`!@#$%^&*()_\-+=§\[\]{};':"\\|,.<>\/?~ ]/.test(password),
      {
        message: "Add one special character",
      },
    ),
  avatar: z.string().optional(),
});
export type CreateUserDTO = z.infer<typeof createUserDTO>;
