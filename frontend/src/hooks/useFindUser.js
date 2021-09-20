import {useState, useEffect} from 'react';

export default function useFindUser() {
  const [user, setUser] = useState(null);
  const [isLoading, setLoading] = useState(true);

  useEffect(() => {
    function findUser() {
      fetch('/api/user', {
      method: 'GET',
      headers: {'Content-Type': 'application/json'}
      })
        .then(response => response.json())
        .then(data => {
          setUser(data.currentUser);
          setLoading(false);
        });
    }

    findUser();
  }, []);

return {
  user,
  setUser,
  isLoading
};

}

