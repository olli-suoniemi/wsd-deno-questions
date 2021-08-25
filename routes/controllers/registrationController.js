import { bcrypt } from "../../deps.js";
import * as userService from "../../services/userService.js";
import { validasaur } from "../../deps.js";

const validationRules = {
    email: [validasaur.required, validasaur.isEmail],
    password: [validasaur.required, validasaur.minLength(4)]
};

const getRegistrationData = async (request) => {
    const body = request.body({ type: "form" });
    const params = await body.value;
    return {
        email: params.get("email"),
        password: params.get("password"),
    };
};

const registerUser = async ({ request, response, render }) => {
    const registrationData = await getRegistrationData(request);

    const [passes, errors] = await validasaur.validate(
        registrationData, validationRules
    );

    const user_exists = await userService.findUserByEmail(registrationData.email);

    registrationData.password = await bcrypt.hash(registrationData.password)
    if (!passes || user_exists.length !== 0) {
        registrationData.validationErrors = errors;
        if (user_exists.length !==0 ) { 
            registrationData.validationErrors.email = { reserved: "email is already in use"}
        }
        render("registration.eta", {
          registrationData: registrationData });
    } else {
        await userService.addUser(
            registrationData.email,
            registrationData.password
        );
        response.redirect("/auth/login");  
    };
};

const showRegistrationForm = ({ render }) => {
    render("registration.eta");
};

export { registerUser, showRegistrationForm };