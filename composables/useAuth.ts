// composables/useAuth.ts
export const useAuth = () => {
  const userRole = useCookie('userRole') 
  const isLoggedIn = computed(() => !!userRole.value) 
  const router = useRouter()
  function logout() {
    userRole.value = null; 
    router.push('/'); 
  }

  return { isLoggedIn, logout }
}
