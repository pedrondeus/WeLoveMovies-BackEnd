function errorHandler(error,  request,response, next){
//   console.log("error hanler invoked", error);
    const { status = 500, message= "Something went wrong!" } = error;
    response.status(status).json({ error: message })
}

module.exports = errorHandler;