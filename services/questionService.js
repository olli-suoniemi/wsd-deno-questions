import { executeQuery } from "../database/database.js";

const addQuestion = async (userId, title, question_text) => {
  await executeQuery(
    `INSERT INTO questions
      (user_id, title, question_text)
        VALUES ($1, $2, $3)`,
    userId,
    title,
    question_text
  );
};

const getQuestions = async ( id ) => {
    const res = await executeQuery(
        "SELECT * FROM questions WHERE user_id = $1 ORDER BY title;",
          id
    );

    return res.rows;
};

const getQuestion = async ( id ) => {
    const res = await executeQuery(
        "SELECT * FROM questions WHERE id = $1",
            id
    );
    if (res.rows.length > 0) {
      return res.rows[0];
    };
};

const addOption = async (question_id, option_text, is_correct) => {
  await executeQuery(
    `INSERT INTO question_answer_options 
      (question_id, option_text, is_correct)
        VALUES ($1, $2, $3)`,
    question_id,
    option_text,
    is_correct
  );
};

const getOptions = async (question_id) => {
  const res = await executeQuery(
    `SELECT * FROM question_answer_options WHERE question_id = $1 ORDER BY random()`,
      question_id
  );
  return res.rows;
};

const deleteQuestionOption = async (option_id) => {
  await executeQuery(
    "DELETE FROM question_answers WHERE question_answer_option_id = $1",
      option_id
  );
  await executeQuery(
    "DELETE FROM question_answer_options WHERE id = $1;",
      option_id
  );
};

const deleteQuestion = async (question_id) => {
  await executeQuery(
    "DELETE FROM questions WHERE id = $1;",
      question_id
  );
};

export { 
  addQuestion, 
  getQuestions, 
  getQuestion, 
  addOption, 
  getOptions,
  deleteQuestionOption,
  deleteQuestion, };