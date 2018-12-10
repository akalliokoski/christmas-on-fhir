export const getStart = config => {
  return config.start();
};

export const getDestination = (id, config) => {
  return config.destinations[id];
};
