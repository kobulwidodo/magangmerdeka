import React, { useState } from 'react';
import { ButtonMain } from '../../components/Button/ButtonMain';
import { Link } from 'react-router-dom';
import { auth, googleProvider } from '../../firebase/firebaseApp';
import {
  createUserWithEmailAndPassword,
  signInWithPopup,
  GoogleAuthProvider,
  signInWithEmailAndPassword,
} from 'firebase/auth';

export const Authentication = () => {
  const [input, setInput] = useState({ email: '', password: '' });
  const [loading, setLoading] = useState(false);
  const [authState, setAuthState] = useState('register');

  const handleSubmit = (event) => {
    event.preventDefault();
    setLoading(true);
    if (authState === 'register')
      createUserWithEmailAndPassword(auth, input.email, input.password)
        .then((userCredential) => {
          // Signed in
          const user = userCredential.user;
          setLoading(false);
          console.log(user);
        })
        .catch((error) => {
          const errorMessage = error.message;
          setLoading(false);
          console.log(errorMessage);
        });
    else
      signInWithEmailAndPassword(auth, input.email, input.password)
        .then((userCredential) => {
          // Signed in
          const user = userCredential.user;
          setLoading(false);
          console.log(user);
        })
        .catch((error) => {
          const errorMessage = error.message;
          setLoading(false);
          console.log(errorMessage);
        });
  };

  return (
    <div className="flex flex-col items-center md:my-8 px-6 py-8 mx-auto lg:py-0">
      <div className="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-2xl xl:p-0 relative">
        <div
          className={`absolute h-full w-full bg-gray-800 bg-opacity-20 rounded-lg grid ${
            !loading && 'hidden'
          }`}
        >
          <span className="animate-ping inline-flex h-48 w-48 m-auto left-1/2 top-1/2 rounded-full bg-[#7839F3] opacity-75"></span>
        </div>
        <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
          <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl ">
            {authState === 'register' && 'Daftarkan akun anda'}
            {authState === 'login' && 'Masuk ke akun anda'}
          </h1>
          <h5>
            {authState === 'register' &&
              'Daftarkan akun anda untuk mendapatkan presentase dari magang/studi independen'}
            {authState === 'login' &&
              'Masuk ke akun anda untuk mendapatkan presentasi dari magang/studi independen'}
          </h5>
          <form className="space-y-4 md:space-y-6" onSubmit={handleSubmit}>
            <div>
              <label className="block mb-2 text-sm font-medium text-gray-900 ">
                Email
              </label>
              <input
                type="email"
                name="email"
                id="email"
                className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:placeholder-gray-400  dark:focus:ring-blue-500 dark:focus:border-blue-500"
                placeholder="name@company.com"
                required=""
                value={input.email}
                onChange={(e) => {
                  setInput({ ...input, email: e.target.value });
                }}
              />
            </div>
            <div>
              <label className="block mb-2 text-sm font-medium text-gray-900 ">
                Password
              </label>
              <input
                type="password"
                name="password"
                id="password"
                placeholder="••••••••"
                className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:placeholder-gray-400  dark:focus:ring-blue-500 dark:focus:border-blue-500"
                required=""
                value={input.password}
                onChange={(e) => {
                  setInput({ ...input, password: e.target.value });
                }}
              />
            </div>
            <ButtonMain type="submit" className="w-full rounded-md">
              {authState === 'register' && 'Daftar'}
              {authState === 'login' && 'Masuk'}
            </ButtonMain>
            <div className="flex w-full items-center justify-center gap-4">
              <hr className="w-1/3" />
              <p>Or</p>
              <hr className="w-1/3" />
            </div>
            <img
              onClick={() => {
                setLoading(true);
                signInWithPopup(auth, googleProvider)
                  .then((result) => {
                    // This gives you a Google Access Token. You can use it to access the Google API.
                    const credential =
                      GoogleAuthProvider.credentialFromResult(result);
                    const token = credential.accessToken;
                    // The signed-in user info.
                    setLoading(false);
                    const user = result.user;
                  })
                  .catch((error) => {
                    // Handle Errors here.
                    const errorCode = error.code;
                    const errorMessage = error.message;
                    // The email of the user's account used.
                    const email = error.customData.email;
                    // The AuthCredential type that was used.
                    const credential =
                      GoogleAuthProvider.credentialFromError(error);
                    setLoading(false);
                  });
              }}
              className="p-2 rounded-full bg-slate-50 shadow-lg cursor-pointer mx-auto"
              src="/google-icon.svg"
              alt="google icon"
            />
            <p className="text-sm font-light text-gray-500 dark:text-gray-400">
              Sudah memiliki akun?{' '}
              <Link
                href="#"
                className="font-medium text-primary-600 hover:underline dark:text-primary-500 "
                onClick={() => {
                  if (authState === 'register') setAuthState('login');
                  else setAuthState('register');
                }}
              >
                {authState === 'register' && 'Masuk'}
                {authState === 'login' && 'Daftar'}
              </Link>
            </p>
          </form>
        </div>
      </div>
    </div>
  );
};
