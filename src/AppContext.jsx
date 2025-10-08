import { createContext, useState, useEffect } from "react";
import { getActivityFromUser, getUser } from "./api/api";

export const AppContext = createContext();

export const AppProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState({ profile: {}, statistics: {} });
  const [currentActivity, setCurrentActivity] = useState([]);
  const [loading, setLoading] = useState(true);
  const [token, setToken] = useState(localStorage.getItem("token"));
  const [error, setError] = useState(null);

  useEffect(() => {
     if (!token) {
    setCurrentUser({ profile: {}, statistics: {} });
    setCurrentActivity([]);
    setLoading(false);
    return;
  }
      const fetchData = async () => {
      try {
        setLoading(true);
        setError(null);

        const user = await getUser(token);
        const activity = await getActivityFromUser(token);

        setCurrentUser(user);
        setCurrentActivity(activity);
      } catch (err) {
        console.error("Erreur récupération données :", err);
        setError("Impossible de récupérer les données utilisateur");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [token]);

    useEffect(() => {
    if (token) {
      localStorage.setItem("token", token);
    } else {
      localStorage.removeItem("token");
    }
  }, [token]);

  return (
    <AppContext.Provider value={{setError, error, token, setToken, currentUser, setCurrentUser, loading, currentActivity, setCurrentActivity }}>
      {children}
    </AppContext.Provider>
  );
};
