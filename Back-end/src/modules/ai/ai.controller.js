import catchAsync from "../../utils/catchAsync.js"

class AIcontroller{
    constructor(aiService){
        this.aiService = aiService
    }

    chat = catchAsync(async (req,res,next)=>{
        const response = await this.aiService.askAI(req.body.prompt);
        res.status(200).json(response);
    })

}

export default AIcontroller