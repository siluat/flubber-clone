module.exports = async () => {
  return {
    transformIgnorePatterns: ["/node_modules/(?!d3-polygon)"],
  };
};
