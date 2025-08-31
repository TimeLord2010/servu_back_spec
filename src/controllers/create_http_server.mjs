import express from "express";
import "express-async-errors";
import { configuration } from "../data/configuration.mjs";
import { errorHandlerMiddleware } from "./middlewares/error_handler_middleware.mjs";
import { adminRouter } from "./routes/admin_router.mjs";
import { userRouter } from "./routes/user_router.mjs";

export async function createHttpServer() {
  const app = express();

  app.use(express.json());

  app.use("/admin", adminRouter);

  app.use("/users", userRouter);

  app.use(errorHandlerMiddleware);

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
