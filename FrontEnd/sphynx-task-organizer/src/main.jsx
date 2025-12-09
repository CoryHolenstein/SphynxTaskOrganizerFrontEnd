import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './amplify-config.js'
import './index.css'
import App from './App.jsx'
import { AuthProvider } from "react-oidc-context";


const cognitoAuthConfig = {
  authority: "https://cognito-idp.us-east-1.amazonaws.com/us-east-1_cxszxt9GQ",
  client_id: "57sdvrue6aqa3tj35vk64gfakv",
  redirect_uri: "https://d3f5c3g2txprn2.cloudfront.net/callback",
  post_logout_redirect_uri: "https://d3f5c3g2txprn2.cloudfront.net/logout",
  response_type: "code",
  scope: "phone openid email",
};

createRoot(document.getElementById('root')).render(
  <StrictMode>
     <AuthProvider {...cognitoAuthConfig}>
       <App />
     </AuthProvider>
  </StrictMode>,
)
