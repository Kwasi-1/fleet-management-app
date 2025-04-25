import { z } from "zod";

export const usersSchema = z.object({
  user_name: z.string(),
  email: z.string(),
  status: z.string(),
  teams: z.string().array(),
});

export type Users = z.infer<typeof usersSchema>;

export const invoiceSchema = z.object({
  invoice: z.string(),
  billing_date: z.string(),
  amount: z.string(),
  plan: z.string(),
  users: z.string(),
});

export type Invoice = z.infer<typeof invoiceSchema>;

export const forecastbyLeaderSchema = z.object({
  name: z.string(),
  plan: z.number(),
  gap_to_plan: z.number(),
  forecast: z.number(),
  //   submissionStatus: z.string(),
  //   ai_forecast: z.string().array(),
});

export type ForecastbyLeader = z.infer<typeof forecastbyLeaderSchema>;

export const openApplicationSchema = z.object({
  app_id: z.string(),
  app_name: z.string(),
  client_name: z.string(),
  total_limi_requested: z.string(),
  submissionStatus: z.string(),
  ai_forecast: z.string().array(),
});

export type OpenApplication = z.infer<typeof openApplicationSchema>;
