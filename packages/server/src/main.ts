import { ConfigService } from "@nestjs/config";
import { NestFactory } from "@nestjs/core";
import { AppModule } from "./app.module";
import cookieParser from "cookie-parser";

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const configService = app.get(ConfigService);

  const corsOptions = { credentials: true, origin: "http://localhost:3000" };
  if (process.env.NODE_ENV === "production") {
    corsOptions.origin = configService.get("ENDPOINT") as string;
  }
  app.enableCors(corsOptions);
  app.use(cookieParser());

  // app.use(morgan("combined"));
  await app.listen(4000);
}

bootstrap();
