import { z } from 'zod';

const AddContentTitleSchema = z.string().min(1).max(50);
const AddContentBodySchema = z.string().min(1).max(500);

const AddContentRequestSchema = z.object({
  content: z.object({
    title: AddContentTitleSchema,
    body: AddContentBodySchema
  })
});

export type AddContentRequestType = z.infer<typeof AddContentRequestSchema>;

export default AddContentRequestSchema;
