import { useRef } from 'react';
import { useRouter } from 'next/router';
import Image from 'next/image';
import styles from './NewPasswordModal.module.css';
import house from '../../assets/images/icons/house.svg';
import key from '../../assets/images/icons/key.svg';
import rocketIcon from '../../assets/images/icons/rocket.svg';
import Input from './Input';
import { useForm } from '../../hooks/newPassword/useForm';

export default function NewPasswordModal({ userEmail, error }) {
 const router = useRouter();
 const refModal = useRef();

 const { form, errors, isSubmitted, handleChange, handleBlur, handleSubmit } =
  useForm(userEmail);

 const handleLogin = () => {
  router.push('/?login=true');
 };

 return (
  <>
   {error ? (
    <div className={styles.modal}>
     <div className={styles.modalContent} ref={refModal}>
      <h3 className={styles.modalTitle}>Uh-oh..</h3>
      <p className={styles.description}>{error}</p>
      <button
       type='submit'
       className={styles.loginButton}
       onClick={handleLogin}>
       <Image src={house} alt='log in icon' width={12} height={12} />
       <span>Home</span>
      </button>
     </div>
    </div>
   ) : (
    <div className={styles.modal}>
     <div className={styles.modalContent} ref={refModal}>
      <h3 className={styles.modalTitle}>Create new password</h3>
      {!isSubmitted ? (
       <>
        <p className={styles.description}>
         Insert a new password for your account.
        </p>
        <form className={styles.formButton}>
         <Input
          label='Password'
          type='password'
          name='password'
          placeholder='password'
          onBlur={handleBlur}
          onChange={handleChange}
          value={form}
          errors={errors}
         />
         <Input
          label='Confirm password'
          type='password'
          name='confirmPassword'
          placeholder='password'
          onBlur={handleBlur}
          onChange={handleChange}
          value={form}
          errors={errors}
         />
         <button
          type='submit'
          className={styles.loginButton}
          onClick={handleSubmit}>
          <Image src={key} alt='log in icon' width={12} height={12} />{' '}
          <span>Save</span>
         </button>
        </form>
       </>
      ) : (
       <>
        <p className={styles.description}>
         Your password was successfully changed, please login to your account.
        </p>
        <button
         type='submit'
         className={styles.loginButton}
         onClick={handleLogin}>
         <Image src={rocketIcon} alt='log in icon' width={12} height={12} />
         <span>log in</span>
        </button>
       </>
      )}
     </div>
    </div>
   )}
  </>
 );
}
