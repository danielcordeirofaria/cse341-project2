const express = require('express');
const passport = require('passport');
const router = express.Router();

// #swagger.tags = ['Authentication']
// #swagger.summary = 'Log in with Google'
router.get('/google', passport.authenticate('google', { scope: ['profile', 'email'] }));

// #swagger.tags = ['Authentication']
// #swagger.summary = 'Google OAuth callback'
router.get(
  '/google/callback',
  passport.authenticate('google', { failureRedirect: '/login-failed' }),
  (req, res) => {
    res.redirect('/api-docs');
  }
);

// #swagger.tags = ['Authentication']
// #swagger.summary = 'Log out'
router.get('/logout', (req, res) => {
  req.logout(() => res.redirect('/')); 
});

module.exports = router;