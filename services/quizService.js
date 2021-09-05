import { executeQuery } from "../database/database.js";

const getRandomQuestion = async() => {
    const result = await executeQuery(
        `SELECT questions.id, questions.title, questions.question_text FROM questions 
            INNER JOIN question_answer_options ON questions.id = question_answer_options.question_id 
                WHERE is_correct = true 
                    ORDER BY RANDOM() 
                        LIMIT 1`
    );
    if (result.rows) {
        return result.rows[0];
    }
};

const addQuestionAnswer = async(user_id, question_id, answer_option_id, is_correct) => {
    await executeQuery(
        `INSERT INTO question_answers 
            (user_id, question_id, question_answer_option_id, correct)
                VALUES ($1, $2, $3, $4)`,
            user_id, question_id, answer_option_id, is_correct
    );
};

const answerCheck = async (question_id, answer_option_id) => {
    const result = await executeQuery(
        `SELECT is_correct FROM question_answer_options 
            WHERE question_id = $1 AND id = $2`,
        question_id, answer_option_id
    );
    
    if (result.rows[0]) {
        return result.rows[0].is_correct;
    };
};

const getRightAnswer = async (question_id) => {
    const result = await executeQuery(
        `SELECT * FROM question_answer_options 
            WHERE question_id = $1 AND is_correct = true`,
        question_id
    );

    if (result.rows[0]) {
        return result.rows[0].option_text;
    };
    
};

export {
    getRandomQuestion,
    addQuestionAnswer,
    answerCheck,
    getRightAnswer,
};