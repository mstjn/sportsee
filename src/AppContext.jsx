import { createContext, useState, useEffect } from "react";
import { getActivityFromUser, getUser } from "./api/api";

export const AppContext = createContext();

export const AppProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState({ profile: {}, statistics: {} });
  const [currentActivity, setCurrentActivity] = useState([]);
  const [loading, setLoading] = useState(true);
 
  useEffect(() => {
    const fetchUser = async () => {
      try {
        const user = await getUser();
        setCurrentUser(user);
        console.log(user);
        
      } catch (err) {
        console.error("Erreur récupération user :", err);
      } finally {
        setLoading(false);
      }
    };
    const fetchActivity = async () => {
      try {
        const activity = await getActivityFromUser();
        setCurrentActivity(activity);
      } catch (err) {
        console.error("Erreur récupération activités :", err);
      } finally {
        setLoading(false);
      }
    };

    fetchUser();
    fetchActivity();
  }, []);

  return <AppContext.Provider value={{ currentUser, setCurrentUser, loading, currentActivity, setCurrentActivity }}>{children}</AppContext.Provider>;
};
