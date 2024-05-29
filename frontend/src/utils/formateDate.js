export const formateDate = (date, config) => {
  const defaultOptions = {
    year: "numeric",
    month: "short",
    day: "numeric",
    timeZone: "UTC",
  };

  const options = config ? config : defaultOptions;

  return new Date(date).toLocaleDateString("en-US", options);
};
