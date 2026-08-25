const gerror = (err,req,res,next)=>{
    const error = {
        message: err.message,
        name: err.name,
        stack: err.stack,
        ...err
    }
    res.status(500).json({
        success: false,
        error
    })
}

export default gerror