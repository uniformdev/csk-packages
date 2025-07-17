'use server';

import { eq } from 'drizzle-orm';
import { generateEmbeddings } from '../ai/embedding';
import { db } from '../db';
import { embeddings as embeddingsTable } from '../db/schema/embeddings';
import { NewResourceParams, insertResourceSchema, resources } from '../db/schema/resources';

export const createOrUpdateResource = async (newResource: NewResourceParams & { textContent: string }) => {
  const { textContent, ...resource } = newResource;
  const inputResource = insertResourceSchema.parse(newResource);

  await db.delete(resources).where(eq(resources.id, inputResource.id));

  await db.insert(resources).values(inputResource);

  const embeddings = await generateEmbeddings(textContent);
  await db.insert(embeddingsTable).values(
    embeddings.map(embedding => ({
      resourceId: resource.id,
      ...embedding,
    }))
  );

  return 'Resource successfully created and embedded.';
};

export const deleteResource = async (resourceId: string) => {
  await db.delete(resources).where(eq(resources.id, resourceId));
};
