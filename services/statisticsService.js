import { executeQuery } from "../database/database.js";

const getNumberOfAnswersUserHasGiven = async (id) => {
    const result = await executeQuery(
        `SELECT COUNT(user_id) FROM question_answers
        WHERE user_id = $1`,
            id
    );

    return result.rows[0];
};

const getNumberOfCorrectAnswersUserHasGiven = async (id) => {
    const result = await executeQuery(
        `SELECT COUNT(correct) FROM question_answers
        WHERE user_id = $1 AND correct = true`,
            id
    );

    return result.rows[0];
};

const getNumberOfAnswersGivenToQuestionsOfUser = async (id) => {
    const result = await executeQuery(
        `SELECT COUNT(questions.user_id)
        FROM questions
        INNER JOIN question_answers
        ON questions.id = question_answers.question_id
        WHERE questions.user_id = $1`,
            id
    );

    return result.rows[0];
};

const getFiveMostAnsweredUsers = async () => {
    const result = await executeQuery(
        `SELECT users.email, count(*) FROM users
        JOIN question_answers ON users.id = question_answers.user_id
        GROUP BY users.email
        ORDER BY count DESC
        LIMIT 5;`
    );

    return result.rows;
};

export {
    getNumberOfAnswersUserHasGiven,
    getNumberOfCorrectAnswersUserHasGiven,
    getNumberOfAnswersGivenToQuestionsOfUser,
    getFiveMostAnsweredUsers
};