import { app } from "../../../app.js"
import { superoak } from "../../../deps.js"
import * as userService from "../../../services/userService.js"

const registrationCredentials = "email=test@test.com&password=test" 
const registrationEmail = "test@test.com"

Deno.test({
    name: "POST request to /auth/register should create a user and redirect user to /",
    fn: async() => {
        const testClient = await superoak(app);
        await testClient.post("/auth/register").send(registrationCredentials).
            expect(302)

        const user = await userService.findUserByEmail(registrationEmail);
        await userService.deleteById(user[0].id)

    },
    sanitizeResources: false,
    sanitizeOps: false,
});