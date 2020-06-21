import bcrypt from 'bcrypt';
import passportLocal from 'passport-local';

const LocalStrategy = passportLocal.Strategy;
const LOGIN_PAGE : string = '/login';

export const checkAuthenticated = (req, res, next) => {
    if(req.isAuthenticated()){
        return next();
    }
    res.redirect(LOGIN_PAGE)
};

export const checkNotAuthenticated = (req, res, next) => {
    if(req.isAuthenticated()){
        res.redirect('/');
    }
    return next();
};

export const logout = (req, res)=> {
    req.logOut();
    res.redirect(LOGIN_PAGE);
};



const initialize = async (passport, getUserByUsername, getUserById) => {
    const authenticateUser = async (email, password, done) => {
        const user = await getUserByUsername(email);
        if(user == null) {
            return done(null, false, {message: "no user found"});
        }

        try {
            if(await bcrypt.compare(password, user.password)){
                done(null, user);
            } else {
                return done(null, false, {message: "password incorrect"})
            }
        } catch (e) {
            return done(e);
        }
    };

    passport.use(new LocalStrategy({usernameField: 'username'}, authenticateUser));
    passport.serializeUser((user, done) => done(null, user.id));
    passport.deserializeUser( async (id, done) => {
        const user = await getUserById(id);
        return done(null, user)
    });
};

export default initialize;
