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

const getAuthId = () => {
  return localStorage.getItem('auth');
};
const constructPath = (relativePath: string) => {
  const isRootIndex = window.location.pathname.endsWith('index.html');
  const basePath = isRootIndex ? '' : '/src/pages';
  return `${basePath}/${relativePath}`;
};

export { convertForm, navigateTo, getUserRole, getAuthId, constructPath };
