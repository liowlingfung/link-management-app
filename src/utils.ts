export const truncate = (str: string, maxLength: number): string => {
  if (str.length <= maxLength) {
    return str;
  }
  const start = str.substring(0, maxLength / 2 - 2);
  const end = str.substring(str.length - (maxLength / 2 - 2));
  return `${start}...${end}`;
};

export const truncateUrl = (url: string, maxLength: number): string => {
  if (url.length <= maxLength) {
    return url;
  }
  let displayUrl = url.replace(/(^\w+:|^)\/\//, '');
  if (displayUrl.length <= maxLength) {
    return displayUrl;
  }
  return truncate(displayUrl, maxLength);
};
