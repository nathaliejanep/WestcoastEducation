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
  if (relativePath === 'index.html') {
    return `/${relativePath}`;
  } else {
    return `/src/pages/${relativePath}`;
  }
  // const isRootIndex =
  //   window.location.pathname.endsWith('index.html') ||
  //   window.location.pathname === '/';

  // const basePath = isRootIndex ? '/src/pages' : '';
  // return `${basePath}/${relativePath}`;
};

export { convertForm, navigateTo, getUserRole, getAuthId, constructPath };
