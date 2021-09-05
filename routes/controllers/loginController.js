import * as userService from "../../services/userService.js";
import { bcrypt } from "../../deps.js";
import { validasaur } from "../../deps.js";

const validationRules = {
    email: [validasaur.required],
    password: [validasaur.required]
};

const getLoginData = async (request) => {
  const body = request.body({ type: "form" });
  const params = await body.value;
  return {
      email: params.get("email"),
      password: params.get("password")
  };
};

const incorrectPasswordOrMissingAccountOcccurs = async (loginData, render) => {
    loginData.validationErrors.general = { general: "Incorrect password or account doesn't exist"}
    render("login.eta", {
      loginData: loginData
    });
}
const processLogin = async ({ request, response, state, render }) => {
  const loginData = await getLoginData(request);

  const [passes, errors] = await validasaur.validate(loginData, validationRules);
  loginData.validationErrors = errors;

  const userFromDatabase = await userService.findUserByEmail(loginData.email);

  if (!passes) {
      render("login.eta", {
        loginData: loginData
      });
      return;
  } else if(userFromDatabase.length != 1) {
      await incorrectPasswordOrMissingAccountOcccurs(loginData, render);
      return;
  }; 

  const user = userFromDatabase[0];
  const passwordMatches = await bcrypt.compare(
    loginData.password,
    user.password,
  );

  if (!passwordMatches) {
      await incorrectPasswordOrMissingAccountOcccurs(loginData, render);
  } else {
      await state.session.set("user", user);
      response.redirect("/questions");
  }  
};

const showLoginForm = ({ render }) => {
  render("login.eta");
};

export { processLogin, showLoginForm };