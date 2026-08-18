"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.register = register;
const auth_service_js_1 = require("./auth.service.js");
async function register(req, res) {
    try {
        const { name, email, password } = req.body;
        if (!name || !email || !password) {
            return res.status(400).json({
                message: "Name, email and password are required",
            });
        }
        const user = await (0, auth_service_js_1.registerUser)(name, email, password);
        return res.status(201).json({
            message: "User created successfully",
            user,
        });
    }
    catch (error) {
        if (error instanceof Error && error.message === "Email already registered") {
            return res.status(409).json({
                message: error.message,
            });
        }
        console.error(error);
        return res.status(500).json({
            message: "Internal server error",
        });
    }
}
