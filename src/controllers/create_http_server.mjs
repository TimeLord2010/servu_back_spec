import express from "express";
import "express-async-errors";
import { configuration } from "../data/configuration.mjs";
import { createUserRoutes } from "./routes/user_router.mjs";
import { ZodError } from "zod";

export async function createHttpServer() {
  const app = express();

  app.use(express.json());

  createUserRoutes(app);

  // Global error handling middleware
  app.use((err, req, res, next) => {
    console.error(err.stack);

    if (err instanceof ZodError) {
      res.status(422).json({
        issues: err.issues,
      });
    }

    res.status(err.status || err.statusCode || 500).json({
      error: {
        message: err.message,
        ...(process.env.NODE_ENV === "development" && { stack: err.stack }),
      },
    });
  });

  const port = configuration.port;

  return new Promise((resolve, reject) => {
    try {
      const server = app.listen(port, () => {
        console.log(`Servidor rodando na porta ${port}`);
        resolve(server);
      });

      server.on("error", (error) => {
        console.error("Erro ao iniciar servidor:", error);
        reject(error);
      });
    } catch (error) {
      reject(error);
    }
  });
}
