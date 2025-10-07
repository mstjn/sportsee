export const getUser = async (token) => {
  const response = await fetch("http://localhost:8000/api/user-info", {
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
  });

  if (!response.ok) {
    throw new Error(`Erreur ${response.status} : ${response.statusText}`);
  }

  const data = await response.json();
  return data;
};
export const getActivityFromUser = async (token) => {
  const response = await fetch("http://localhost:8000/api/user-activity?startWeek=2010-01-01&endWeek=2027-01-01", {
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
  });
  if (!response.ok) {
    throw new Error(`Erreur ${response.status} : ${response.statusText}`);
  }
  const data = await response.json();
  return data;
};
export const login = async (username, password) => {
  try {
    const response = await fetch("http://localhost:8000/api/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ username, password }),
    });
    if (!response.ok) {
      return false;
    }

    const data = await response.json();

    console.log(data);

    return data;
  } catch {
    throw new Error("Erreur dans la récupération de l'api");
  }
};
