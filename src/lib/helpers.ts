export const checkImageURL = (url: string) => {
  if (!url) return false;
  else {
    const pattern = new RegExp(
      '^https?:\\/\\/.+\\.(png|jpg|jpeg|bmp|gif|webp)$',
      'i'
    );
    return pattern.test(url);
  }
};

export const truncate = (str: string, length: number) => {
  let dots = str?.length > length ? '...' : '';
  return str?.substring(0, length) + dots;
};
