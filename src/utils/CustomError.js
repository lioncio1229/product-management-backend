
class CustomError extends Error {
    constructor(message, errorCode){
        super(message);
        this.errorCode = errorCode;
    }
}

function sendErrorResponse(res, e){
    res.status(e.errorCode).send({
        name: e.message,
        errorCode: e.errorCode,
    });
}

module.exports = {
    CustomError,
    sendErrorResponse,
};