export const getUser = async () => {
    const response = await fetch("/mocks/user.json")
    const data = await response.json()
    return data   
}
export const getActivityFromUser = async () => {
    const response = await fetch("/mocks/activity.json", {
  headers: {
    Authorization: "Bearer fake_token_123"
  }
})
    const data = await response.json()
    return data
}
export const login = async (username, password) => {
  try {
    const response = await fetch("/mocks/token.json", {
      headers : {
        body : {"username" : username, "password": password}
      }
    })
    if (!response.ok) {return false}
    
    const data = await response.json()
    return data

  }catch {
    throw new Error("Erreur dans la récupération de l'api")
  }
}