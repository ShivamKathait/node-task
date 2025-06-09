import { Strategy as JwtStrategy, ExtractJwt, StrategyOptions } from 'passport-jwt';
import passport from 'passport';
import UserModel from '../models/users.models';
import { appConfig } from "../config/index.config";

const opts: StrategyOptions = {
    jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    secretOrKey: appConfig.JWT_ACCESS_SECRET,
};

passport.use(new JwtStrategy(opts, async (payload, done) => {
    try {
        const user = await UserModel.findById(payload._id, { password: 0}, { lean: true });
        if (!user) return done(null, false);
        return done(null, user);
    } catch (err) {
        return done(err, false);
    }
})
);

export default passport;
