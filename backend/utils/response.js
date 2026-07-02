// API Response formatter

exports.success = (res, data, message = 'Success', statusCode = 200) => {
  return res.status(statusCode).json({
    success: true,
    message,
    data,
  });
};

exports.error = (res, message = 'Error', statusCode = 400, errors = null) => {
  return res.status(statusCode).json({
    success: false,
    message,
    errors,
  });
};

exports.paginated = (res, data, pagination, message = 'Success') => {
  return res.status(200).json({
    success: true,
    message,
    data,
    pagination,
  });
};

exports.created = (res, data, message = 'Resource created successfully') => {
  return res.status(201).json({
    success: true,
    message,
    data,
  });
};

exports.noContent = (res) => {
  return res.status(204).send();
};

exports.unauthorized = (res, message = 'Unauthorized') => {
  return res.status(401).json({
    success: false,
    message,
  });
};

exports.forbidden = (res, message = 'Forbidden') => {
  return res.status(403).json({
    success: false,
    message,
  });
};

exports.notFound = (res, message = 'Resource not found') => {
  return res.status(404).json({
    success: false,
    message,
  });
};

exports.serverError = (res, message = 'Internal Server Error') => {
  return res.status(500).json({
    success: false,
    message,
  });
};
