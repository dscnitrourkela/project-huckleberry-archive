export const limitString = (str, n) => (str ? (str.length >= n ? `${str.substr(0, n)}...` : str) : null);
