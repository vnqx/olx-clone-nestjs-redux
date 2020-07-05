import { ConfigModule, ConfigService } from "@nestjs/config";
import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";

@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        type: "postgres" as any,
        host:
          process.env.RDS_HOSTNAME ||
          (configService.get("POSTGRES_HOST") as string),
        port:
          process.env.RDS_PORT ||
          (configService.get("POSTGRES_PORT") as number),
        username:
          process.env.RDS_USERNAME ||
          (configService.get("POSTGRES_USER") as string),
        password:
          process.env.RDS_PASSWORD ||
          (configService.get("POSTGRES_PASSWORD") as string),
        database:
          process.env.RDS_DB_NAME ||
          (configService.get("POSTGRES_DB") as string),
        entities: [__dirname + "/../**/*.entity.{js,ts}"],
        synchronize: (process.env.TYPEORM_SYNC ||
          configService.get("SYNCHRONIZE")) as boolean,
      }),
    }),
  ],
})
export class DatabaseModule {}
