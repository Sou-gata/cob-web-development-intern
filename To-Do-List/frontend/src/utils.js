import { toast } from "react-hot-toast";
import axios from "axios";
import baseUrl from "./baseUrl";
export default function (type, message) {
    if (type === "success") {
        return toast.success(message, {
            style: {
                padding: "16px",
                background: "green",
                color: "#fff",
            },
            iconTheme: {
                primary: "white",
                secondary: "green",
            },
        });
    } else if (type === "error") {
        toast.error(message, {
            style: {
                padding: "16px",
                background: "#bb2d3b",
                color: "#fff",
            },
            iconTheme: {
                primary: "white",
                secondary: "#bb2d3b",
            },
        });
    }
}

export async function makeAsComplete(id) {
    try {
        let res = await axios.get(`${baseUrl}/api/make-completed/${id}`);
        if (res.data.success) return { success: true, todo: res.data.todo };
        else return { success: false, message: res.data.message };
    } catch (error) {
        return { success: false, message: error.message };
    }
}
export async function makeAsIncomplete(id) {
    try {
        let res = await axios.get(`${baseUrl}/api/make-incomplete/${id}`);
        if (res.data.success) return { success: true, todo: res.data.todo };
        else return { success: false, message: res.data.message };
    } catch (error) {
        return { success: false, message: error.message, error };
    }
}

const pad = (num) => {
    return num < 10 ? "0" + num : num;
};
export const dateToString = (date) => {
    let d = new Date(date);
    let year = d.getFullYear();
    let month = d.getMonth() + 1;
    let day = d.getDate();
    if (isNaN(year)) return "";
    return `${year}-${pad(month)}-${pad(day)}`;
};
