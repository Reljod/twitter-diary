import { z } from 'zod';

const AddContentResponseSchema = z.object({
  contentId: z.string()
});

export default AddContentResponseSchema;
