import { UsersService } from "../users/users.service";
import { ConfigService } from "@nestjs/config";
import { PassportStrategy } from "@nestjs/passport";
import { Injectable } from "@nestjs/common";
import { ExtractJwt, Strategy } from "passport-jwt";
import User from "../users/user.entity";
import { TokenPayload } from "../interfaces";

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(
    private readonly configService: ConfigService,
    private readonly usersService: UsersService,
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromExtractors([
        function (req) {
          const tokenWithBearer: string | undefined = req.cookies.token;
          if (tokenWithBearer) {
            return tokenWithBearer.replace("Bearer ", "");
          }
          return null;
        },
      ]),
      ignoreExpiration: false,
      secretOrKey: configService.get<string>("JWT_SECRET"),
    });
  }

  async validate(payload: TokenPayload): Promise<User> {
    return this.usersService.getById(payload.userId);
  }
}
