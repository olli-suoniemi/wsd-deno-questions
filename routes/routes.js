import { Router } from "https://deno.land/x/oak@v7.7.0/mod.ts";
import * as mainController from "./controllers/mainController.js";
import * as questionController from "./controllers/questionController.js";
import * as quizController from "./controllers/quizController.js"
import * as statisticsController from "./controllers/statisticsController.js"
import * as registrationController from "./controllers/registrationController.js";
import * as loginController from "./controllers/loginController.js";
import * as apiController from "./apis/apiController.js";
import * as logoutController from "./controllers/logoutController.js";

const router = new Router();

router.get("/", mainController.showMain);

router.get("/questions", questionController.getQuestions);
router.post("/questions", questionController.addQuestion);

router.get("/questions/:id", questionController.getQuestion);
router.post("/questions/:id/options", questionController.addOption);

router.post("/questions/:questionId/options/:optionId/delete", 
    questionController.deleteQuestionOption);

router.post("/questions/:id/delete", questionController.deleteQuestion);

router.get("/quiz", quizController.getRandomQuestion);
router.get("/quiz/:id", quizController.askRandomQuestion);

router.post("/quiz/:id/options/:optionId", quizController.answerCheck);

router.get("/quiz/:id/correct", quizController.answerFeedback);
router.get("/quiz/:id/incorrect", quizController.answerFeedback);

router.get("/statistics", statisticsController.showStatistics);

router.get("/auth/register", registrationController.showRegistrationForm);
router.post("/auth/register", registrationController.registerUser);

router.get("/auth/login", loginController.showLoginForm);
router.post("/auth/login", loginController.processLogin);

router.get("/api/questions/random", apiController.getRandomQuestion);
router.post("/api/questions/answer", apiController.answerQuestion);

router.get("/auth/logout", logoutController.logout);

export { router };