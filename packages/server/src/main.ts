import { NestFactory } from "@nestjs/core";
import { AppModule } from "./app.module";
import cookieParser from "cookie-parser";
import cors from "cors";
import morgan from "morgan";

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.use(cors({ credentials: true, origin: "http://localhost:3000" }));
  app.use(cookieParser());
  // app.use(morgan("combined"));
  await app.listen(4000);
}

bootstrap();
