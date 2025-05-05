import { startServer } from "@/server/server";

try {
  startServer();
} catch (error) {
  console.error("Failed to start server:", error);
}
