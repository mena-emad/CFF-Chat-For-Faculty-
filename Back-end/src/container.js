import AIService from "./modules/ai/ai.service.js";
import AIcontroller from "./modules/ai/ai.controller.js";
import AiRoutes from "./modules/ai/ai.routes.js";
import AiRepository from "./modules/ai/ai.repository.js";

const aiRepository = new AiRepository();
const aiService = new AIService(aiRepository);
const aiController = new AIcontroller(aiService);
const aiRoutes = new AiRoutes(aiController);


export {aiRoutes};