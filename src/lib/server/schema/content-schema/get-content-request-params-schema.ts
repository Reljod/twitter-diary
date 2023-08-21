import { z } from 'zod';

const GetContentRequestParamsSchema = z.object({
  count: z.string().nullable(),
  skip: z.string().nullable()
});

export type GetContentRequestParamsType = z.infer<
  typeof GetContentRequestParamsSchema
>;

export default GetContentRequestParamsSchema;
