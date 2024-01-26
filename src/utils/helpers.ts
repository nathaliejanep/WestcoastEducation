const convertForm = <T>(formData: FormData): T => {
  const data = Object.fromEntries(formData.entries());
  return data as T;
};

// TODO: use this where it is needed
const navigateTo = (path: string) => {
  window.location.href = path;
};

const getUserRole = () => {
  return localStorage.getItem('userRole');
};

export { convertForm, navigateTo, getUserRole };
