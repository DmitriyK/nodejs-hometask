const responseMiddleware = (req, res, next) => {
  // TODO: Implement middleware that returns result of the query
  if (res.err) {
    res.json({ error: true, message: res.err.message });
  }
  
  if (res.data){
    res.status(200).json(res.data);
  }

  next();
}

exports.responseMiddleware = responseMiddleware;