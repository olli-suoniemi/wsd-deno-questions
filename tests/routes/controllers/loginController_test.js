import { app } from "../../../app.js"
import { superoak } from "../../../deps.js"

const loginCredentials = "email=&password="        // set the loginCredentials to match your database

Deno.test({
    name: "POST request to /auth/login should redirect the user to /",
    fn: async() => {
        const testClient = await superoak(app);
        await testClient.post("/auth/login").send(loginCredentials).
            expect(302)

    },
    sanitizeResources: false,
    sanitizeOps: false,
});