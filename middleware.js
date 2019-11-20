function authorization(req, res, next) {
  const { apikey } = req.query;

  if (apikey === process.env.API_KEY) {
    next();

  } else {
    res.status(401);
    res.send('Api key is not recognized')
  }
}

module.exports = {
  authorization
};
