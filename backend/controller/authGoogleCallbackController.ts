import passport from "passport"

const authGoogleCallbackRouteHandler =passport.authenticate( 'google', {
        successRedirect: '/auth/google/callback',
        failureRedirect: '/auth/google/failure'
})

export default authGoogleCallbackRouteHandler;