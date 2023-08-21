import BodySchema from '$lib/server/schema/content-schema/body-schema';
import TitleSchema from '$lib/server/schema/content-schema/title-schema';
import { z } from 'zod';

const AddContentRequestSchema = z.object({
  content: z.object({
    title: TitleSchema,
    body: BodySchema
  })
});

export type AddContentRequestType = z.infer<typeof AddContentRequestSchema>;

export default AddContentRequestSchema;
