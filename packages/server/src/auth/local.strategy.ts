import { PublicUser } from "./../types";
import { AuthService } from "./auth.service";
import { Injectable } from "@nestjs/common";
import { PassportStrategy } from "@nestjs/passport";
import { Strategy } from "passport-local";

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
  constructor(private readonly authService: AuthService) {
    super({ usernameField: "email" });
  }

  async validate(email: string, password: string): Promise<PublicUser> {
    return this.authService.validateUser(email, password);
  }
}
