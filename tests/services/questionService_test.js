import * as questionService from "../../services/questionService.js"
import { assertEquals } from "https://deno.land/std@0.100.0/testing/asserts.ts";

const QUESTION_ID = ""          // set the id here to match a question from your database

Deno.test({
    name: "Function getQuestion returns a question from the id with corresponding id",
    fn: async() => {
        const res = await questionService.getQuestion(QUESTION_ID);      
        assertEquals(Object.keys(res), ["id", "user_id", "title", "question_text"]);
    },
    sanitizeResources: false,
    sanitizeOps: false,
});

Deno.test({
    name: "Function getOptions returns answer options for specific question",
    fn: async() => {
        const res = await questionService.getOptions(QUESTION_ID);
        res.forEach(element => {
            assertEquals(Object.keys(element), ["id", "question_id", "option_text", "is_correct"]);
        });
    },
    sanitizeResources: false,
    sanitizeOps: false,
});

