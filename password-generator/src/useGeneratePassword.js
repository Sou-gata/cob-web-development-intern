import { useState } from "react";

const useGeneratePassword = () => {
    const [password, setPassword] = useState("");
    const generatePassword = (length, chechBoxData) => {
        let characters = "";
        let finalPassword = "";
        let selected = chechBoxData.filter((item) => item.status);
        selected.forEach((item) => {
            if (item.name === "lowercase") {
                characters += "abcdefghijklmnopqrstuvwxyz";
            } else if (item.name === "uppercase") {
                characters += "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
            } else if (item.name === "number") {
                characters += "0123456789";
            } else if (item.name === "special") {
                characters += "!@#$%^&*()_+~`|}{[]?,./-=";
            }
        });
        for (let i = 0; i < length; i++) {
            finalPassword += characters.charAt(Math.floor(Math.random() * characters.length));
        }
        setPassword(finalPassword);
    };
    return { password, generatePassword };
};

export default useGeneratePassword;
