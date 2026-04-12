import { createClient, type FilteredResponseQueryOptions, type SanityClient } from "next-sanity";

import { apiVersion, dataset, isSanityConfigured, projectId } from "../../../sanity/env";

const isDev = process.env.NODE_ENV === "development";

export const sanityClient: SanityClient | null = isSanityConfigured
  ? createClient({
      projectId,
      dataset,
      apiVersion,
      // Disable CDN — we rely on Next.js cache + on-demand revalidation instead
      useCdn: false,
      perspective: "published",
    })
  : null;

/**
 * Fetch options passed to every `sanityClient.fetch()` call.
 * - Dev: no cache so edits are instant.
 * - Prod: tag-based cache invalidated by the `/api/revalidate` webhook.
 */
export const sanityFetchOptions: FilteredResponseQueryOptions = isDev
  ? { next: { revalidate: 0 } }
  : { next: { tags: ["sanity"] } };
