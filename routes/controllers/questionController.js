import * as questionService from "../../services/questionService.js";
import { validasaur } from "../../deps.js";

const questionValidationRules = {
    title: [validasaur.required, validasaur.minLength(1)],
    question_text: [validasaur.required, validasaur.minLength(1)],
};

const optionValidationRules = {
    option_text: [validasaur.required, validasaur.minLength(1)],
};

const getQuestionData = async (request, user) => {
    const body = request.body({ type: "form" });
    const params = await body.value;
    return {
        user_id: user.id,
        title: params.get("title"),
        question_text: params.get("question_text"),
    };
};

const addQuestion = async ({ request, response, user, render }) => {
    const questionData = await getQuestionData(request, user);
    
    const [passes, errors] = await validasaur.validate(
        questionData,
        questionValidationRules
    );

    if(!passes) {
        questionData.validationErrors = errors;
        render("questions.eta", { 
                questionData: questionData,
                questions: await questionService.getQuestions(user.id) });
    } else {
        await questionService.addQuestion(
            user.id,
            questionData.title,
            questionData.question_text
        );
        response.redirect("/questions");
    };
};

const getQuestions = async ({ render, user }) => {
    render("questions.eta", { 
        questions: await questionService.getQuestions(user.id), 
    });
};

const getQuestion = async ({ params, render }) => {
    const question_id = params.id
    render("question.eta", { 
        question: await questionService.getQuestion(question_id),
        options: await questionService.getOptions(question_id),
        });
};

const getOptionData = async (request, params) => {
    const body = request.body({ type: "form" });
    const form_params = await body.value;
    return {
        question_id: params.id,
        option_text: form_params.get("option_text"),
        is_correct: Boolean(form_params.get("is_correct")),
    };
};

const addOption = async ({ request, response, params, render }) => {
    const optionData = await getOptionData(request, params)
    const [passes, errors] = await validasaur.validate(
        optionData, optionValidationRules
    );
    if (!passes) {
        optionData.validationErrors = errors;
        render("question.eta", {
            optionData: optionData,
            question: await questionService.getQuestion(params.id),
            options: await questionService.getOptions(params.id) 
        });
    } else {
        await questionService.addOption(
            params.id,                          
            optionData.option_text,
            optionData.is_correct
        );
        response.redirect(`/questions/${params.id}`)
    };
};

const deleteQuestionOption = async ({ params, response }) => {
    const question_id = params.questionId;
    const option_id = params.optionId;
    await questionService.deleteQuestionOption(option_id)
    response.redirect(`/questions/${question_id}`);
};

const deleteQuestion = async ({ params, response }) => {
    const question_id = params.id;
    await questionService.deleteQuestion(question_id);
    response.redirect("/questions");
};

export { 
    addQuestion, 
    getQuestions, 
    getQuestion, 
    addOption,
    deleteQuestionOption,
    deleteQuestion, };