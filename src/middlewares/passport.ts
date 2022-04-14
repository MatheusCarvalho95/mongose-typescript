import { Strategy as JwtStrategy } from "passport-jwt";
import { ExtractJwt } from "passport-jwt";
import passport from "passport";
import User from "../db/models/user";
import IUser from "../db/interfaces/user";

const privateKey = process.env.PRIVATE_KEY ?? "no-key";

const opts = {
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  secretOrKey: privateKey,
};

passport.use(
  new JwtStrategy(opts, function (jwt_payload, done) {
    User.findOne(
      { email: jwt_payload.email },
      function (err: Error, user: IUser) {
        if (err) {
          return done(err, false);
        }
        if (user) {
          return done(null, user);
        } else {
          return done(null, false);
        }
      },
    );
  }),
);
