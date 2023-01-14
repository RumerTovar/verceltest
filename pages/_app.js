import { GoogleOAuthProvider } from '@react-oauth/google';
import '../styles/globals.css';

const clientId = process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID;

export default function App({ Component, pageProps }) {
 return (
  <GoogleOAuthProvider clientId={clientId}>
   <Component {...pageProps} />
  </GoogleOAuthProvider>
 );
}
