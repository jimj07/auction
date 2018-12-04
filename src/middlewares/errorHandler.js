module.exports = (err, req, res, next) => {
  if (process.env.SUPRESS_LOG !== 'true') {
    console.error(err);
  }

  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  res.status(err.status || 500);
  res.json({
    error: err
  });
  next();
};