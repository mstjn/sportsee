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