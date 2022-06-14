const responseMiddleware = (req, res, next) => {
  // TODO: Implement middleware that returns result of the query
  switch(res.statusCode) {
    case 200:
      res.status(200).json(res.data);
      break;
    case 400:
      res.status(400).json({ error: true, message: res.err.message });
      break;
    case 404:
      res.status(404).json({ error: true, message: res.err.message });
      break;
    default:
      break;
  }
  next();
}

exports.responseMiddleware = responseMiddleware;