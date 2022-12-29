export const transformTitleToPath = (title: string): string => {
  return title
    .replace(/\s+/g, '-')
    .toLowerCase()
    .replace(/[^a-zA-Z0-9-_]/g, '');
};