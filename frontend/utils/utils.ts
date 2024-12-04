export const extractPaths = (obj: any, parentKey = ''): string[] => {
  let paths: string[] = [];

  for (const key in obj) {
    const value = obj[key];
    const path = parentKey ? `${parentKey}.${key}` : key;

    if (typeof value === 'object' && value !== null) {
      paths = paths.concat(extractPaths(value, path));
    } else {
      paths.push(path);
    }
  }

  return paths;
};