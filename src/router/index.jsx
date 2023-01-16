import React, { createContext, useEffect, useState } from 'react';
import { BrowserRouter, Route, Routes, useLocation } from 'react-router-dom';
import Home from '../pages/Home';
import Magang from '../pages/Magang';
import Studi from '../pages/Studi';
import Navbar from '../components/Navbar';
import { Authentication } from '../pages/Auth/Register';
import { auth } from '../firebase/firebaseApp';
import { onAuthStateChanged } from 'firebase/auth';
import { UserContext } from '../context/UserContext';
import { createAvatar } from '@dicebear/core';
import { micah } from '@dicebear/collection';

const ScrollToTop = () => {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return null;
};

const Router = () => {
  const [user, setUser] = useState(null);

  onAuthStateChanged(auth, async (user) => {
    if (user) {
      const avatar = createAvatar(micah, {
        size: 64  ,
      });
      user.avatar = await avatar.toDataUri();
      setUser(user);
    } else {
      setUser(null);
    }
  });

  return (
    <BrowserRouter>
      <UserContext.Provider value={user}>
        <ScrollToTop />
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/magang" element={<Magang />} />
          <Route path="/studi" element={<Studi />} />
          <Route path="/daftar" element={<Authentication />} />
        </Routes>
      </UserContext.Provider>
    </BrowserRouter>
  );
};

export default Router;
