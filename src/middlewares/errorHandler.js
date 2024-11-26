export const errorHandler = (error, req, res, next) => {
    console.error(error);
    const status = error.statusCode || 500;
    res.status(status).json({
      status,
      error: error.name,
      message: error.message,
      path: req.url,
    });
  };