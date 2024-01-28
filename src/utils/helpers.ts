const convertForm = <T>(formData: FormData): T => {
  const data = Object.fromEntries(formData.entries());
  return data as T;
};

const navigateTo = (path: string) => {
  window.location.href = path;
};

const getUserRole = () => {
  return localStorage.getItem('userRole');
};

const getAuthId = () => {
  return localStorage.getItem('auth');
};

const constructPath = (relativePath: string) => {
  if (relativePath === 'index.html') {
    return `/${relativePath}`;
  } else {
    return `/src/pages/${relativePath}`;
  }
};

export { convertForm, navigateTo, getUserRole, getAuthId, constructPath };
