import * as quizService from "../../services/quizService.js"
import { assertEquals } from "https://deno.land/std@0.100.0/testing/asserts.ts";

// set the parameters accordingly

const QUESTION_AND_CORRECT_OPTION = {     // set here a question id and a correct answer option for that question
    question_id: "",                        
    option_id: ""
};
                                           
const QUESTION_AND_WRONG_OPTION = {     // set here a question id and a wrong answer option for that question
    question_id: "",                   
    option_id: ""                       // the answer option has to be set for this particular question
};

Deno.test({
    name: "Function getRandomQuestion returns random id of a question from the database",
    fn: async() => {
        const res = await quizService.getRandomQuestion();
        assertEquals(Object.keys(res)[0], "id");
    },
    sanitizeResources: false,
    sanitizeOps: false,
});


Deno.test({
    name: "Function answerCheck returns true on correct answer",
    fn: async() => {
        const res = await quizService.answerCheck(
            QUESTION_AND_CORRECT_OPTION.question_id, QUESTION_AND_CORRECT_OPTION.option_id);      
        assertEquals(res, true);
    },
    sanitizeResources: false,
    sanitizeOps: false,
});

Deno.test({
    name: "Function answerCheck returns false on wrong answer",
    fn: async() => {
        const res = await quizService.answerCheck(
            QUESTION_AND_WRONG_OPTION.question_id, QUESTION_AND_WRONG_OPTION.option_id);         
        assertEquals(res, false);
    },
    sanitizeResources: false,
    sanitizeOps: false,
});


