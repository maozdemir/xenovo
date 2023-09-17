import { useEffect, useState } from 'react';

const Auth = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem('token');
    setIsLoggedIn(!!token);

    return () => {
    };
  }, []);

  return isLoggedIn;
};

export default Auth;
