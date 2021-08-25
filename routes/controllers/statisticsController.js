import * as statisticsService from "../../services/statisticsService.js";

const showStatistics = async ({ render, user }) => {
    render("statistics.eta", {
        answers: await statisticsService.getNumberOfAnswersUserHasGiven(user.id),
        correct_answers: await statisticsService.getNumberOfCorrectAnswersUserHasGiven(user.id),
        answers_given_to_user : await statisticsService.getNumberOfAnswersGivenToQuestionsOfUser(user.id),
        five_most_answered_users : await statisticsService.getFiveMostAnsweredUsers() 
    });
};

export {
    showStatistics,
};
