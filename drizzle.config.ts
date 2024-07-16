// dotenv config import
import "dotenv/config";

// Importing defineConfig from drizzle-kit
import { defineConfig } from "drizzle-kit";

// Defining the configuration for Drizzle
export default defineConfig({
  
  dialect: "postgresql", // "sqlite" | "mysql" | "postgresql"
  dbCredentials: {
    url: process.env.DATABASE_URL!, // Provide a fallback value
  },
  schema: "./db/schema.ts", // Path to your schema file
  out: "./drizzle", // Output directory for the generated files
  migrations: {
    table: "migrations", // Table name for storing migrations
    schema: "public", // Schema for storing migrations (Postgres only)
  },
});
