import { defineCollection, defineContentConfig } from '@nuxt/content'
import { z } from 'zod'

export default defineContentConfig({
  collections: {
    cooking: defineCollection({
      type: 'page',
      source: 'cooking/*.md',
      schema: z.object({
        title: z.string(),
        description: z.string(),
        date: z.string(),
        image: z.string().optional(),
        time: z.string().optional(),
        servings: z.number().optional(),
        tags: z.array(z.string()).optional(),
        ingredients: z.array(z.string()).optional(),
        instructions: z.array(z.string()).optional(),
      }),
    }),
    writing: defineCollection({
      type: 'page',
      source: 'writing/*.md',
      schema: z.object({
        title: z.string(),
        description: z.string(),
        date: z.string(),
        image: z.string().optional(),
        readTime: z.string().optional(),
        tags: z.array(z.string()).optional(),
        category: z.string().optional(),
      }),
    }),
    music: defineCollection({
      type: 'page',
      source: 'music/*.md',
      schema: z.object({
        title: z.string(),
        description: z.string(),
        date: z.string(),
        artist: z.string().optional(),
        genre: z.string().optional(),
        image: z.string().optional(),
        tags: z.array(z.string()).optional(),
      }),
    }),
    dev: defineCollection({
      type: 'page',
      source: 'dev/*.md',
      schema: z.object({
        title: z.string(),
        description: z.string(),
        date: z.string(),
        readTime: z.string().optional(),
        category: z.string().optional(),
        tags: z.array(z.string()).optional(),
      }),
    }),
    thoughts: defineCollection({
      type: 'page',
      source: 'thoughts/*.md',
      schema: z.object({
        title: z.string(),
        description: z.string(),
        date: z.string(),
        mood: z.string().optional(),
      }),
    }),
  },
})
