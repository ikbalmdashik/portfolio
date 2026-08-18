"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.registerUser = registerUser;
const bcrypt_1 = __importDefault(require("bcrypt"));
const prisma_js_1 = require("../../database/prisma.js");
async function registerUser(name, email, password) {
    // Check whether user already exists
    const existingUser = await prisma_js_1.prisma.user.findUnique({
        where: {
            email,
        },
    });
    if (existingUser) {
        throw new Error("Email already registered");
    }
    // Hash password
    const hashedPassword = await bcrypt_1.default.hash(password, 12);
    // Create user
    const user = await prisma_js_1.prisma.user.create({
        data: {
            name,
            email,
            isEmailVerified: false,
            password: hashedPassword,
        },
    });
    // Never return the password/hash
    return {
        id: user.id,
        name: user.name,
        email: user.email,
        isEmailVerified: user.isEmailVerified,
        createdAt: user.createdAt,
    };
}
