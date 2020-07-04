import { UsersModule } from "./users/users.module";
import { AuthModule } from "./auth/auth.module";
import { PostingsModule } from "./postings/postings.module";
import { DatabaseModule } from "./database.module";
import { Module } from "@nestjs/common";
import { ConfigModule } from "@nestjs/config";
import { UploadModule } from "./upload/upload.module";
import { AccountModule } from "./account/account.module";
import { ChatsModule } from "./chats/chats.module";
import Joi from "@hapi/joi";

@Module({
  imports: [
    ConfigModule.forRoot({
      validationSchema: Joi.object({
        POSTGRES_HOST: Joi.string().required(),
        POSTGRES_PORT: Joi.number().required(),
        POSTGRES_USER: Joi.string().required(),
        POSTGRES_PASSWORD: Joi.string().required(),
        POSTGRES_DB: Joi.string().required(),
        PORT: Joi.number(),
        JWT_SECRET: Joi.string().required(),
        JWT_EXPIRES_IN: Joi.string().required(),
        CLOUDINARY_CLOUD_NAME: Joi.string().required(),
        CLOUDINARY_API_KEY: Joi.number().required(),
        CLOUDINARY_API_SECRET: Joi.string().required(),
        ENDPOINT: Joi.string().required(),
      }),
    }),
    PostingsModule,
    DatabaseModule,
    AuthModule,
    UsersModule,
    UploadModule,
    AccountModule,
    ChatsModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
