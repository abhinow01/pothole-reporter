const express = require('express');
const passport = require('passport');
const jwt = require('jsonwebtoken');
//@ts-ignore
const router = express.Router();
router.get('/google', passport.authenticate('google', { scope: ['profile', 'email'] }));

router.get('/google/callback' , 
    passport.authenticate('google' , {session : false , failureRedirect : '/'}),
    (req: any , res : any) => {
        const user = req.user;
        const token = jwt.sign({id : user._id} , process.env.JWT_SECRET! , { expiresIn: '7d' })
        res.redirect(`${process.env.FRONTEND_URL}/auth/callback?token=${token}`)
    }
)