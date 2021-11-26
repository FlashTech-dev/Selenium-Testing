const errorMiddlewareHandler = (err, req, res, next) => {

    const errorStatus = res.statusCode === 200 ? 500 : res.statusCode;
    res.status(errorStatus);
    res.json({
        message: err.message,
    });
};

module.exports = { errorMiddlewareHandler };