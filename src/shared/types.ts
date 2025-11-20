import z from "zod";

export const HistoricalEventSchema = z.object({
  year: z.number(),
  text: z.string(),
  pages: z.array(z.object({
    title: z.string(),
    extract: z.string().optional(),
    url: z.string().optional(),
  })).optional(),
});

export type HistoricalEvent = z.infer<typeof HistoricalEventSchema>;

export const FamousPersonSchema = z.object({
  year: z.number(),
  text: z.string(),
  pages: z.array(z.object({
    title: z.string(),
    extract: z.string().optional(),
    url: z.string().optional(),
  })).optional(),
});

export type FamousPerson = z.infer<typeof FamousPersonSchema>;

export const LocationHistorySchema = z.object({
  title: z.string(),
  extract: z.string(),
  url: z.string().optional(),
  distance: z.number().optional(),
  coordinates: z.object({
    lat: z.number(),
    lon: z.number(),
  }).optional(),
});

export type LocationHistory = z.infer<typeof LocationHistorySchema>;

export const GeolocationSchema = z.object({
  latitude: z.number(),
  longitude: z.number(),
});

export type GeolocationData = z.infer<typeof GeolocationSchema>;

export type Language = 'pt' | 'en' | 'it';

export const LanguageSchema = z.enum(['pt', 'en', 'it']);
