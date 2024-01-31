import { constructPath, convertForm } from '../utils/helpers';

describe('constructPath function', () => {
  test('should return correct path for "index.html', () => {
    const relativePath = 'index.html';
    const result = constructPath(relativePath);
    expect(result).toEqual(`/${relativePath}`);
  });
});

test('should return correct path for other files', () => {
  const relativePath = 'dashboard.html';
  const result = constructPath(relativePath);
  expect(result).toEqual(`/src/pages/${relativePath}`);
});

describe('convertForm function', () => {
  test('should convert FormData to object', () => {
    const formData = new FormData();
    formData.append('name', 'Jane Doe');
    formData.append('email', 'student@example.com');

    const result = convertForm<{ name: string; email: string }>(formData);
    expect(result).toEqual({ name: 'Jane Doe', email: 'student@example.com' });
  });
});
