const bcrypt = require("bcrypt");

export const createHash = async (plainText: string): Promise<string> => {
    if (plainText.length >= 20) {
        throw new Error("Password length should be less than 20 characters");
    }
    const saltRounds = 10;
    const salt = await bcrypt.genSalt(saltRounds);
    return bcrypt.hash(plainText, salt);
};