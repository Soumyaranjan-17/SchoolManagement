const sendSuccessResponse = (res, data, message = "Success", statusCode = 200) => {
    res.status(statusCode).json({
        message,
        data
    });
};

const sendErrorResponse = (res, message = "An error occurred", statusCode = 500, errors = null) => {
    res.status(statusCode).json({
        message,
        errors
    });
};

module.exports = {
    sendSuccessResponse,
    sendErrorResponse
};
