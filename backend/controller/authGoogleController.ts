import passport from 'passport'

const authGoogleRouteHandler = passport.authenticate('google', { scope:
        [ 'email', 'profile' ] }
  )


export default authGoogleRouteHandler;