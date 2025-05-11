// utils/format.js
export const formatImageName = (name) => {
    if (!name) return 'default';
    return name
      .toString()
      .toLowerCase()
      .normalize('NFD')
      .replace(/[\u0300-\u036f]/g, '')
      .replace(/\s+/g, '_');
  };