export const buildQuery = (params) => {
  const queryParams = [];

  for (const key in params) {
    const value = params[key];
    if (value !== null && value !== undefined && value !== "") {
      const encodedKey = encodeURIComponent(key);
      const encodedValue = encodeURIComponent(value);
      queryParams.push(`${encodedKey}=${encodedValue}`);
    }
  }

  return queryParams.join("&");
};
