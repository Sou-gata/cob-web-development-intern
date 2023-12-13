import React from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { FaAnglesRight, FaCalendarDays, FaPlus, FaCheck, FaLandmarkFlag } from "react-icons/fa6";
import { GoPaste } from "react-icons/go";
import { RxCross1 } from "react-icons/rx";
import { Context } from "../Context";

const Menu = () => {
    const navigate = useNavigate();
    const { pathname } = useLocation();
    const [selected, setSelected] = React.useState("");
    React.useEffect(() => {
        if (pathname === "/completed") {
            setSelected("complete");
        } else if (pathname === "/incomplete") {
            setSelected("incomplete");
        } else if (pathname == "/upcoming") {
            setSelected("upcoming");
        } else if (pathname == "/today") {
            setSelected("today");
        } else if (pathname == "/past") {
            setSelected("old");
        } else if (pathname == "/work") {
            setSelected("work");
        } else if (pathname == "/personal") {
            setSelected("personal");
        } else if (pathname == "/others") {
            setSelected("others");
        } else {
            setSelected("");
        }
    }, [pathname]);
    const { setModals } = React.useContext(Context);
    return (
        <div className="w-[15.7vw] h-[95vh] border-r-[1px] flex flex-col items-center py-4 px-3 ">
            <div
                className={`w-full px-3 py-2 flex items-center gap-3 border-[1px] rounded-md cursor-pointer transition-all duration-300 hover:border-[#1677ff] hover:text-[#1677ff]`}
                onClick={() => {
                    setModals((prev) => ({ ...prev, isAddModalVisible: true }));
                }}
            >
                <FaPlus />
                <p className={`${selected == "add" ? "text-blue-600" : "#000"}`}>Add new task</p>
            </div>
            <div className="w-full px-3">
                <p className="text-xs font-semibold mt-4 mb-2">Category</p>
                <div className="pl-2">
                    <div
                        className={`flex gap-4 items-center mb-2 rounded-lg p-2 cursor-pointer ${
                            selected == "complete" && "bg-blue-200"
                        } transition-all duration-300 hover:bg-blue-100`}
                        onClick={() => {
                            setSelected("complete");
                            navigate("/completed");
                        }}
                    >
                        <FaCheck color={selected == "complete" ? "#1677ff" : "#000"} size={14} />
                        <p className={selected == "complete" ? "text-blue-600" : "#000"}>
                            Complete
                        </p>
                    </div>
                    <div
                        className={`flex gap-4 items-center mb-2 rounded-lg p-2 cursor-pointer ${
                            selected == "incomplete" && "bg-blue-200"
                        } transition-all duration-300 hover:bg-blue-100`}
                        onClick={() => {
                            setSelected("incomplete");
                            navigate("/incomplete");
                        }}
                    >
                        <RxCross1 color={selected == "incomplete" ? "#1677ff" : "#000"} size={14} />
                        <p className={selected == "incomplete" ? "text-blue-600" : "#000"}>
                            Incompleted
                        </p>
                    </div>
                </div>
            </div>
            <div className="w-full px-3">
                <p className="text-xs font-semibold mt-4 mb-2">TASKS</p>
                <div className="pl-2">
                    <div
                        className={`flex gap-3 items-center mb-2 p-2 rounded-lg cursor-pointer ${
                            selected == "upcoming" && "bg-blue-200"
                        } transition-all duration-300 hover:bg-blue-100`}
                        onClick={() => {
                            navigate("/upcoming");
                            setSelected("upcoming");
                        }}
                    >
                        <FaAnglesRight
                            color={selected == "upcoming" ? "#1677ff" : "#000"}
                            size={14}
                        />
                        <p
                            className={`${
                                selected == "upcoming" ? "text-blue-600" : "#000"
                            } lg:block hidden`}
                        >
                            Upcoming
                        </p>
                    </div>
                    <div
                        className={`flex gap-4 items-center mb-2 rounded-lg p-2 cursor-pointer ${
                            selected == "today" && "bg-blue-200"
                        } transition-all duration-300 hover:bg-blue-100`}
                        onClick={() => {
                            navigate("/today");
                            setSelected("today");
                        }}
                    >
                        <FaCalendarDays
                            color={selected == "today" ? "#1677ff" : "#000"}
                            size={14}
                        />
                        <p className={selected == "today" ? "text-blue-600" : "#000"}>Today</p>
                    </div>
                    <div
                        className={`flex gap-4 items-center mb-2 rounded-lg p-2 cursor-pointer ${
                            selected == "old" && "bg-blue-200"
                        } transition-all duration-300 hover:bg-blue-100`}
                        onClick={() => {
                            navigate("/past");
                            setSelected("old");
                        }}
                    >
                        <GoPaste color={selected == "old" ? "#1677ff" : "#000"} size={14} />
                        <p className={selected == "old" ? "text-blue-600" : "#000"}>Old</p>
                    </div>
                </div>
            </div>
            <div className="w-full px-3">
                <p className="text-xs font-semibold mt-4 mb-2">Lists</p>
                <div className="pl-2">
                    <div
                        className={`flex gap-4 items-center mb-2 rounded-lg p-2 cursor-pointer ${
                            selected == "personal" && "bg-blue-200"
                        } transition-all duration-300 hover:bg-blue-100`}
                        onClick={() => {
                            setSelected("personal");
                            navigate("/personal");
                        }}
                    >
                        <div className="bg-orange-600 w-4 h-4 rounded-md" />
                        <p className={selected == "personal" ? "text-blue-600" : "#000"}>
                            Personal
                        </p>
                    </div>
                    <div
                        className={`flex gap-4 items-center mb-2 rounded-lg p-2 cursor-pointer ${
                            selected == "work" && "bg-blue-200"
                        } transition-all duration-300 hover:bg-blue-100`}
                        onClick={() => {
                            navigate("/work");
                            setSelected("work");
                        }}
                    >
                        <div className="bg-blue-600 w-4 h-4 rounded-md" />
                        <p className={selected == "work" ? "text-blue-600" : "#000"}>Work</p>
                    </div>
                    <div
                        className={`flex gap-4 items-center mb-2 rounded-lg p-2 cursor-pointer ${
                            selected == "others" && "bg-blue-200"
                        } transition-all duration-300 hover:bg-blue-100`}
                        onClick={() => {
                            setSelected("others");
                            navigate("/others");
                        }}
                    >
                        <div className="bg-yellow-400 w-4 h-4 rounded-md" />
                        <p className={selected == "others" ? "text-blue-600" : "#000"}>Others</p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Menu;
