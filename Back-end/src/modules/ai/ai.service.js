import AppError from "../../utils/AppError.js";

class AIService{
    constructor(aiRepository){
        this.aiRepository = aiRepository;
    }

    async askAI(userPrompt){
        if(!userPrompt || typeof userPrompt !== 'string'){
            throw new AppError('Please provide a valid prompt',400);
        }
        try{
            const response = await this.aiRepository.generateResponse(userPrompt);
            return response

        }catch(error){
            throw new AppError(error.message,400);
        }
    }
}

export default AIService;
