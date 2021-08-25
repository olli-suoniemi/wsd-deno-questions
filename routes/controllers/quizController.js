import * as quizService from "../../services/quizService.js";
import * as questionService from "../../services/questionService.js";

const getRandomQuestion = async ({ response }) => {
    const question = await quizService.getRandomQuestion();
    response.redirect(`/quiz/${question.id}`);
};

const askRandomQuestion = async ({ params, render }) => {
    render("quiz.eta", {
        question: await questionService.getQuestion(params.id),
        answer_options: await questionService.getOptions(params.id)
    });
};

const answerCheck = async ({ params, response, user }) => {
    const question_id = params.id;
    const answer_option_id = params.optionId;
    const is_correct = await quizService.answerCheck(question_id, answer_option_id);
    await quizService.addQuestionAnswer(user.id, question_id, answer_option_id, is_correct);

    if (is_correct) {
        response.redirect(`/quiz/${question_id}/correct`);
    } else {
        response.redirect(`/quiz/${question_id}/incorrect`);
    };
}; 

const answerFeedback = async ({ render, request, params }) => {
    render("feedback.eta", { 
        incorrect: request.url.pathname.includes("incorrect"),
        right_answer: await quizService.getRightAnswer(params.id)
    });
};

export {
    getRandomQuestion,
    askRandomQuestion,
    answerCheck,
    answerFeedback
};