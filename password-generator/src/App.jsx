import { useEffect, useState } from "react";
import useGeneratePassword from "./useGeneratePassword";

const App = () => {
    const { password, generatePassword } = useGeneratePassword();
    const data = [
        {
            title: "Include Uppercase",
            name: "uppercase",
            status: true,
        },
        {
            title: "Include Lowercase",
            name: "lowercase",
            status: true,
        },
        {
            title: "Include Numbers",
            name: "number",
            status: true,
        },
        {
            title: "Include Special Charecter",
            name: "special",
            status: true,
        },
    ];
    const [checkBoxes, setCheckBoxes] = useState(data);
    const [length, setLength] = useState(8);
    const [copied, setCopied] = useState("Copy");
    const [strength, setStrength] = useState("Poor");
    useEffect(() => {
        generatePassword(length, checkBoxes);
    }, [length, checkBoxes]);
    const handlePassword = () => {
        generatePassword(length, checkBoxes);
    };
    const handleCopy = () => {
        navigator.clipboard.writeText(password);
        setCopied("Copied");
        setTimeout(() => {
            setCopied("Copy");
        }, 1500);
    };
    useEffect(() => {
        if (password.length > 0) {
            if (password.length < 8) {
                setStrength("Poor");
            } else if (password.length < 10) {
                setStrength("Medium");
            } else if (password.length < 12) {
                setStrength("Strong");
            } else {
                setStrength("Very Strong");
            }
        }
    }, [password]);
    return (
        <div>
            <div className="w-full h-[100vh] bg-[#1d1d1d] text-white flex items-center justify-center flex-col gap-10">
                <p className="text-3xl font-bold">Password Generator</p>
                <div className="w-[300px] h-[550px] md:h-[420px] md:w-[500px] border border-blue-600 rounded-lg p-8">
                    <div className="flex justify-between flex-col md:flex-row gap-2 md:gap-0">
                        {password && <p className="text-xl text-center md:text-left">{password}</p>}
                        {!password && (
                            <p className="text-xl text-red-500 text-center md:text-left">
                                Please select atleast one option
                            </p>
                        )}
                        <button
                            type="button"
                            onClick={handleCopy}
                            className="bg-blue-600 hover:bg-blue-700 rounded-lg text-sm px-5 py-1.5 focus:outline-none transition-all"
                        >
                            {copied}
                        </button>
                    </div>
                    <div className="py-8">
                        <div className="flex justify-between mb-4">
                            <p className="text-xl font-bold">Character Length</p>
                            <p className="text-xl font-bold">{length}</p>
                        </div>
                        <input
                            className="w-full"
                            type="range"
                            name=""
                            id=""
                            min={6}
                            max={20}
                            value={length}
                            onChange={(e) => {
                                setLength(e.target.value);
                            }}
                        />
                    </div>
                    <div className="flex justify-between flex-wrap">
                        {checkBoxes.map((checkBox, i) => (
                            <div key={i} className="mb-4 cursor-pointer">
                                <input
                                    className="mr-3"
                                    type="checkbox"
                                    name={checkBox.name}
                                    id={checkBox.name}
                                    checked={checkBox.status}
                                    onChange={(e) => {
                                        setCheckBoxes((prev) => {
                                            const data = [...prev];
                                            data[i].status = e.target.checked;
                                            return data;
                                        });
                                    }}
                                />
                                <label className="text-lg cursor-pointer" htmlFor={checkBox.name}>
                                    {checkBox.title}
                                </label>
                            </div>
                        ))}
                    </div>
                    <div className="flex justify-between my-4">
                        <p className="font-bold">Strength:</p>
                        <p
                            className={
                                strength == "Poor"
                                    ? "text-red-500"
                                    : strength == "Medium"
                                    ? "text-orange-500"
                                    : strength == "Strong"
                                    ? "text-yellow-500"
                                    : "text-green-500"
                            }
                        >
                            {strength}
                        </p>
                    </div>
                    <div>
                        <button
                            onClick={handlePassword}
                            className="w-full bg-blue-600 py-2.5 rounded-lg cursor-pointer hover:bg-blue-700 transition-all"
                        >
                            Generate
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default App;
