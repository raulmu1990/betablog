import { defineCollection, z } from "astro:content";

const posts = defineCollection({
    schema: z.object({
        title: z.string(),
        category: z.string(),
        author: z.string(),
        publishDate: z.date(),
        image: z.string(),
        authorAvatar: z.string()
    })
});

export const collections = { posts };