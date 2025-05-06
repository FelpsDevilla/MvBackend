import https from "https";
import fs from "fs";
import { config } from "@/config";
import app from "@/app/app";
import { createDatabasePool } from "@/db/Database";

export const dbPool = createDatabasePool(config.db);

export function startServer() {
  const { keyPath, certPath } = config.ssl;

  if (!keyPath || !certPath) {
    throw new Error("Certificate or key path not provided");
  }

  const httpsOptions = {
    key: fs.readFileSync(keyPath),
    cert: fs.readFileSync(certPath),
  };

  https.createServer(httpsOptions, app).listen(config.port, () => {
    console.log(`Server started at port ${config.port}`);
  });
}
