import { z } from 'zod';

const DeleteContentResponseSchema = z.object({
  contentId: z.number()
});

export type DeleteContentResponseType = z.infer<
  typeof DeleteContentResponseSchema
>;

export default DeleteContentResponseSchema;
