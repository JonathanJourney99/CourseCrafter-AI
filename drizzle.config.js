import { defineConfig } from "drizzle-kit";

export default defineConfig({
  dialect: "postgresql",
  schema: "./configs/schema.jsx",
  dbCredentials: {
    url: 'postgresql://db_owner:lomKxMEUO1q9@ep-misty-dust-a4ttzv5r.us-east-1.aws.neon.tech/db?sslmode=require',
  },
});