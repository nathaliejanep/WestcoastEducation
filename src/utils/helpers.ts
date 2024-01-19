export const convertForm = (formData: FormData) => {
  const data = Object.fromEntries(formData.entries());
  return data;
};
