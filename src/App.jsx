import { useEffect, useState } from "react";
import { getUser, getActivityFromUser } from "./api/api";
const App = () => {
  const [user, setUser] = useState(null);
  const [userActivity, setUserActivity] = useState(null);

  useEffect(() => {
    const fetchUser = async () => {
      const data = await getUser();
      setUser(data);
    };
    const fetchUserActivity = async () => {
      const data = await getActivityFromUser();
      setUserActivity(data);
    };

    fetchUser();
    fetchUserActivity();
  }, []);

  return <div>Coucou</div>;
};
export default App;
