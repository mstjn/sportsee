import { createContext, useState, useEffect } from "react";
import { getUser } from "./api/api";

export const AppContext = createContext()

export const AppProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const user = await getUser();
        setCurrentUser(user);
      } catch (err) {
        console.error("Erreur récupération user :", err);
      } finally {
        setLoading(false);
      }
    };

    fetchUser();
  }, []);

  return (
    <AppContext.Provider value={{ currentUser, setCurrentUser, loading }}>
      {children}
    </AppContext.Provider>
  );
};