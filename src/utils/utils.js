export const isLogin = () => {
  const res = sessionStorage.getItem('login')
  return res
}