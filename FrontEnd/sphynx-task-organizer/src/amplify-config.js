// src/amplify-config.js
import { Amplify } from "aws-amplify";

Amplify.configure({
  Auth: {
    Cognito: {
      userPoolId: "us-east-1_rRWs7XXku",
      userPoolClientId: "1mm208612qf0lm90dgurnlapgf",
      loginWith: {
        oauth: {
          domain: "us-east-1rrws7xxku.auth.us-east-1.amazoncognito.com",
          scopes: ["openid", "email", "profile"],
          // MUST be arrays for v6:
          redirectSignIn: ["http://localhost:5173/callback"],
          redirectSignOut: ["http://localhost:5173/logout"],
          responseType: "code",
        },
      },
    },
  },
});
