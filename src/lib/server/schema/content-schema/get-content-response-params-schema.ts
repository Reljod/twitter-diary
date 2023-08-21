import BodySchema from '$lib/server/schema/content-schema/body-schema';
import TitleSchema from '$lib/server/schema/content-schema/title-schema';
import { z } from 'zod';

const GetContentResponseParamsSchema = z.object({
  contents: z.array(
    z.object({
      username: z.string().nullable(),
      title: TitleSchema,
      body: BodySchema.nullable(),
      id: z.number(),
      createdAt: z.date(),
      updatedAt: z.date(),
      authorId: z.number()
    })
  )
});

export type GetContentResponseParamsType = z.infer<
  typeof GetContentResponseParamsSchema
>;

export default GetContentResponseParamsSchema;
