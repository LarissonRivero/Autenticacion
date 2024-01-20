import React, { useEffect, useState } from 'react';

const Private = () => {
  const [userName, setUserName] = useState('');

  useEffect(() => {
    const userObjectString = localStorage.getItem('userObject');

    if (userObjectString) {
      const userObject = JSON.parse(userObjectString);
      if (userObject && userObject.name) {
        setUserName(userObject.name);
      }
    }
  }, []);

  return (
    <div>
      <h1>Welcome, {userName}!</h1>
    </div>
  );
}

export default Private;

