import axios from 'axios';
import NewPasswordModal from '../../components/newPasswordModal/NewPasswordModal';

const url = process.env.NEXT_PUBLIC_LOCAL_HOMEPAGE;

export default function ChangePassword({ userEmail, isValidToken }) {
 return (
  <>
   {isValidToken ? (
    <NewPasswordModal userEmail={userEmail} error='' />
   ) : (
    <NewPasswordModal
     userEmail={userEmail}
     error="We're sorry, but the password recovery link you have provided is no longer valid. Please request a new password recovery link and try again."
    />
   )}
  </>
 );
}

ChangePassword.getInitialProps = async ({ query }) => {
 try {
  const req = await axios.post(`${url}/api/verifyToken`, {
   token: query.emailToken,
  });
  const { res, email } = req.data;
  if (res === 'ok') {
   return {
    isValidToken: true,
    userEmail: email,
    emailToken: query.emailToken,
   };
  } else {
   return {
    isValidToken: false,
    userEmail: email,
    emailToken: query.emailToken,
   };
  }
 } catch (error) {
  return console.error(error);
 }
};
