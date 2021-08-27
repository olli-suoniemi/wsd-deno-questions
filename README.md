<code>CREATE TABLE users (
  id SERIAL PRIMARY KEY,
  email VARCHAR(255) UNIQUE,
  password CHAR(60)
);</code>
<br>
<br>
<code>
CREATE TABLE questions (
  id SERIAL PRIMARY KEY,
  user_id INTEGER REFERENCES users(id),
  title VARCHAR(256) NOT NULL,
  question_text TEXT NOT NULL
);</code>
<br>
<br>
<code>
CREATE TABLE question_answer_options (
  id SERIAL PRIMARY KEY,
  question_id INTEGER REFERENCES questions(id),
  option_text TEXT NOT NULL,
  is_correct BOOLEAN DEFAULT false
);</code>
<br>
<br>
<code>
CREATE TABLE question_answers (
  id SERIAL PRIMARY KEY,
  user_id INTEGER REFERENCES users(id),
  question_id INTEGER REFERENCES questions(id),
  question_answer_option_id INTEGER REFERENCES question_answer_options(id),
  correct BOOLEAN DEFAULT false
);</code>
<br>
<br>
<code>
CREATE UNIQUE INDEX ON users((lower(email)));
</code>

---

<h1> Question Quiz </h1>

Use the above database table statements to create needed tables to run the program. After this insert 
your database credentials to the database.js file located in the database-folder. 

The table users contains information about users who have registered to the application. The table users stores user information; each user will have an unique identifier id, an email and a password. Further, all stored emails will be unique.

The table questions contains questions that are created by users; each question has an unique identifier id, the id of the user who created the question user_id, a title title, and a text containing the question question_text.

The table question_answer_options lists the options available for the specific question (identified by question_id). Each answer option has a text option_text and information on whether the question answer option is correct or not is_correct.

Finally, the table question_answers stores answers posted to the questions; each question answer has an identifier id, the id of the user who answered the question user_id, the id of the question that was being answered question_id, and the question_answer_option_id that contains the option that the user chose. For simplicity, the table also contains information on whether the answer was correct (correct), even though the information could be inferred from the table question_answer_options.

---

This app was built on an online course called Web Software Development 2021 offered by Aalto University.

Aim of the final project and course was to develop and improve web development skills and learn how to construct and design web applications which are structually sound and secure.

This app can be used for creating quizzes from your own and other people's created questions. This tool is handy for teachers and students who are looking for a easy way to create flashcards out of your own topics.

---

The app can be tested online in [here](https://wsd-deno-questions.herokuapp.com/)

---

In order to run the program locally you have to install Deno. [Installation guidelines for Deno](https://deno.land/manual/getting_started/installation). <br>Use version 1.11.5. You can set it by command: <code> deno upgrade --version 1.11.5 </code><br>

---

Unit tests and HTTP tests can be found in the test folder. In order them to work correctly, you have to insert in them your own parameters which matches the ids of your own database. There are more specific instructions commented to each test. In order to run tests use this command in the root of the application: 
<code>deno test --allow-net --unstable --allow-read</code><br>
In order to run the app locally use this command in the root of the application: 
<code>deno run --unstable --allow-all --watch run-locally.js</code>

---

Credits for the background image:

<a href="https://www.freepik.com/vectors/background">Background vector created by starline - www.freepik.com</a>