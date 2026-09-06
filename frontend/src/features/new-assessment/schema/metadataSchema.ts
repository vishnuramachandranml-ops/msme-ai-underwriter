import { z } from "zod";

export const metadataSchema = z.object({

    request_id: z.string(),

    source_system: z.string(),

    model_version: z.string(),

});

export type Metadata = z.infer<typeof metadataSchema>;