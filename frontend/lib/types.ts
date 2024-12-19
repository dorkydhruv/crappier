import z from "zod";

export const CreateUserSchema = z.object({
  email: z.string().email(),
  password: z.string().min(6),
  name: z.string().min(2),
});

export const LoginSchema = z.object({
  email: z.string().email(),
  password: z.string().min(6),
});

export const ZapSchema = z.object({
  availableTriggerId: z.string(),
  name: z.string().optional(),
  triggerMetadata: z.record(z.any()).optional(),
  actions: z.array(
    z.object({
      availableActionId: z.string(),
      actionMetadata: z.record(z.any()).optional(),
    })
  ),
});
