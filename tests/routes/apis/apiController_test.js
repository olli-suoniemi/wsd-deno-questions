import { app } from "../../../app.js"
import { superoak } from "../../../deps.js"
import { assertMatch, assertEquals } from "../../../deps.js"

const QUESTION_AND_CORRECT_OPTION = {     // set here a question id and a correct answer option for that question
    "questionId": "",                    // change the ids to match existings from your database
    "optionId": ""
};

Deno.test({
    name: "GET request to /api/questions/random should return JSON document",
    fn: async() => {
        const testClient = await superoak(app);
        await testClient.get("/api/questions/random").
            expect("Content-Type", new RegExp("application/json"));
    },
    sanitizeResources: false,
    sanitizeOps: false,
});

Deno.test({
    name: "GET request to /api/questions/random should return JSON document which is non empty",
    fn: async() => {
        const testClient = await superoak(app);
        const result = await testClient.get("/api/questions/random");
        assertEquals(Object.keys(result.body).length, 2);  
    },
    sanitizeResources: false,
    sanitizeOps: false,
});

Deno.test({
    name: "GET request to /api/questions/random should return JSON document containing keys questionId and answerOptions",
    fn: async() => {
        const testClient = await superoak(app);
        const result = await testClient.get("/api/questions/random");
        const objectKeys = Object.keys(result.body);
        assertMatch(objectKeys, new RegExp(["questionId", "answerOptions"])); 
    },
    sanitizeResources: false,
    sanitizeOps: false,
});

Deno.test({
    name: "POST request to /api/questions/answer should respond with incorrect or correct",
    fn: async() => {
        const testClient = await superoak(app);
        const res = await testClient.post("/api/questions/answer").send(QUESTION_AND_CORRECT_OPTION)
        assertEquals(res.text.includes("correct"), true)    
        const obj = JSON.parse(res.text);
        assertEquals(obj.correct, true)    
    },
    sanitizeResources: false,
    sanitizeOps: false,
});
