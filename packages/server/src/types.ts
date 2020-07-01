import User from "./users/user.entity";

export type PublicUser = Omit<User, "passwordHash">;
