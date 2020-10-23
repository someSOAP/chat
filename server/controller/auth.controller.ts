import { Router } from 'express'
import passport from 'passport';

import { checkAuthenticated, checkNotAuthenticated, logout } from "../auth";
import { createPageRoute } from "../service";
import { createUser } from "../service/user.service";

const router : Router = Router();

router.get("/login", checkNotAuthenticated, createPageRoute('login'));

router.get("/logout", checkAuthenticated, logout);

router.post("/login", passport.authenticate('local', {
    successRedirect: '/',
    failureRedirect: '/auth/login',
    failureFlash: true,
}));

router.get("/register", checkNotAuthenticated, createPageRoute('register'));

router.post("/register", checkNotAuthenticated, async (req, res) => {
    try {
        const { username, password } = req.body;
        await createUser(username , password);
        res.redirect('/auth/login');
    } catch (e) {
        console.error(e);
        res.redirect('/auth/register');
    }
});

export default router;
