const timeHandler = (seconds) => {
  const minute = parseInt(seconds / 60, 10);
  return `${minute}:${seconds - 60 * minute}`;
};
export default timeHandler;
