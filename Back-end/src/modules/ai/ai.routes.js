import {Router} from 'express'
class Airoutes{
    constructor(aiController){
        this.aiRouter = Router();
        this.aiController = aiController
        this.initializeRoutes();
    }

    initializeRoutes(){
        this.aiRouter.post('/chat',this.aiController.chat)
    }

    getRouter(){
        return this.aiRouter;
    }
}

export default Airoutes