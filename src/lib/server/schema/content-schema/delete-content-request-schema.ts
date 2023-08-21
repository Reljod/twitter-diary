import { z } from 'zod';

const DeleteContentRequestSchema = z.object({
  contentId: z.number()
});

export type DeleteContentRequestType = z.infer<
  typeof DeleteContentRequestSchema
>;

export default DeleteContentRequestSchema;
