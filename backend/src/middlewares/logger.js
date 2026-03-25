const logger = (req, res, next) => {
  const method = req.method;
  const url = req.originalUrl;
  const date = new Date().toISOString();

  console.log(`[${date}] ${method} ${url}`);

  next();
};

module.exports = logger;