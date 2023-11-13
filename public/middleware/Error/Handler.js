
// ERROR HANDLER MIDDLEWARE
const errorMiddleware = (err, req, res, next) => {
    res.status(err.statusCode|| 500).json({
        msg:err.message || 'Server Error'
    })
};

// EXTENDING ERROR CLASS
class ErrorHandler extends Error {
    constructor(message, statusCode) {
      super(message);
      this.statusCode = statusCode;
    }
}
  
// Async Error Handler
const asyncErrorHandler = (passedFunction) => (req, res, next) => {
    Promise.resolve(passedFunction(req, res, next)).catch((err)=>{
        next(err)
    });
};
  
  

module.exports ={errorMiddleware,ErrorHandler,asyncErrorHandler}

