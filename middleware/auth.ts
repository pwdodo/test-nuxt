// middleware/auth.js
export default defineNuxtRouteMiddleware((to, from) => {
  const userRole = useCookie('userRole').value;
  
  if (!userRole) {
    return navigateTo('/gagal');
  }

  if (to.path.startsWith('/admin') && userRole !== 'admin') {
    return navigateTo('/gagal')
  }

});
