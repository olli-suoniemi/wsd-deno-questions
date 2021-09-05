import * as quizService from "../../services/quizService.js";
import * as questionService from "../../services/questionService.js";

const getRandomQuestion = async ({ response }) => {
    const question = await quizService.getRandomQuestion();
    if (!question || question.length === 0) {
        response.body = {}
        return
    }
    const options = await questionService.getOptions(question.id);
    if (!options || options.length === 0) {
        response.body = {}
        return
    }

    const objects = [];
    options.forEach(option => {
        const object = {
            "optionId": option.id,
            "optionText": option.option_text
        };
        objects.push(object);
    });

    const data = {
        "questionId": question.id,
        "questionTitle": question.title,
        "questionText": question.question_text,
        "answerOptions": objects
    };
    
    response.body = data;
};

const answerQuestion = async ({ request, response }) => {
    const body = request.body({ type: "json" });
    const content = await body.value;
    const result = await quizService.answerCheck(content.questionId, content.optionId);
    response.body = {
        "correct": Boolean(result)
    };
};

export { 
    getRandomQuestion,
    answerQuestion
};