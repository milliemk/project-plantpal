import { ExtractJwt, Strategy as JwtStrategy } from "passport-jwt";
import UserModel from "../models/usersModel.js";

const passportOptions = {
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  // in secret key do the env file thing, process.env blabla
  secretOrKey: "some very complicated password",
};

const passportStrategy = new JwtStrategy(passportOptions, async function (
  jwt_payload,
  done
) {
  // if no user, token is probably invalid
  const user = await UserModel.findOne({ _id: jwt_payload.sub });
  if (!user) {
    const error = "no user found with the information contained in the token";
    return done(error, false);
  }
  if (user) {
    return done(null, user);
  }
});

export default passportStrategy;
