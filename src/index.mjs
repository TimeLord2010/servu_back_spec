import { createHttpServer } from "./controllers/create_http_server.mjs";
import { configuration } from "./data/configuration.mjs";
import { db } from "./services/database.mjs";
import { runWithElapsed } from "./services/logger.mjs";

try {
  await runWithElapsed("DB:CONNECT", async () => {
    const { databaseUrl, databaseUser, databasePassword } = configuration;
    await db.connect(databaseUrl, {
      namespace: "servu",
      database: "servu",
      auth: {
        username: databaseUser,
        password: databasePassword,
      },
    });
  });

  await runWithElapsed("SERVER:START", async () => await createHttpServer());

  console.log("Aplicação iniciada com sucesso");
} catch (error) {
  console.error("Erro durante inicialização:", error);
  process.exit(1);
}
