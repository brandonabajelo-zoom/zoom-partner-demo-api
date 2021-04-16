const globalErrorHandler = (error = {}, res, customMessage = 'Error') => {
  if (res) {
    const { status, data } = error.response || {};
    if (status && data) {
      return res.status(status).json({ msg: data.message })
    }
    return res.status(500).json({ message: customMessage })
  }
}

module.exports = globalErrorHandler;