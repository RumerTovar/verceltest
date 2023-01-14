import { useGoogleLogin } from '@react-oauth/google';
import axios from 'axios';
import { DgraphSignUp } from './DgraphSignUp';

const googleUrl = 'https://www.googleapis.com/oauth2/v3/userinfo';

export const useGooglehook = (setProfile, setIsOpen, setLoginError) => {
 const login = useGoogleLogin({
  onSuccess: async (response) => {
   try {
    const res = await axios(googleUrl, {
     headers: {
      Authorization: `Bearer ${response.access_token}`,
     },
    });

    const { data } = res;

    DgraphSignUp(data, setProfile, setIsOpen, setLoginError);
   } catch (error) {
    console.error(error);
   }
  },
 });

 return {
  login,
 };
};
