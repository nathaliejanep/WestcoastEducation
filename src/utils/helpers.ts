export const convertForm = <T>(formData: FormData): T => {
  const data = Object.fromEntries(formData.entries());
  return data as T;
};