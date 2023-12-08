import React from "react";
import { Link, Outlet } from "react-router-dom";
import Menu from "./Menu";
import baseUrl from "../baseUrl";
import { Context } from "../Context";
import axios from "axios";
import { Toaster } from "react-hot-toast";
import AddTodoModal from "./AddTodoModal";
import EditTodoModal from "./EditTodoModal";
import DeleteTodoModal from "./DeleteTodoModal";
import ViewTodoModal from "./ViewTodoModal";
const Layout = () => {
    const { setTodos } = React.useContext(Context);

    React.useEffect(() => {
        (async () => {
            try {
                const res = await axios.get(`${baseUrl}/api/all`);
                if (res.data.success) {
                    let data = res.data.todos.map((item) => {
                        return {
                            title: item.title,
                            description: item.description,
                            list: item.list,
                            date: item.date,
                            isCompleted: item.isCompleted,
                            key: item._id.toString(),
                        };
                    });
                    setTodos(data);
                }
            } catch (error) {}
        })();
    }, []);
    return (
        <div>
            <div className="h-[8vh] shadow-lg w-full bg-white sticky top-0 left-0 px-10 z-10">
                <div className="flex justify-between items-center h-full">
                    <Link to={"/"} className="text-2xl font-bold">
                        TODO APP
                    </Link>
                    <div className="mr-5">By Sougata Talukder</div>
                </div>
            </div>
            <div className="flex">
                <div className="fixed left-0 top-[8vh]">
                    <Menu />
                </div>
                <div className="ml-[15.7vw] w-[84.3vw] z-0">
                    <Outlet />
                </div>
            </div>
            <Toaster position="top-right" />
            <AddTodoModal />
            <EditTodoModal />
            <DeleteTodoModal />
            <ViewTodoModal />
        </div>
    );
    s;
};
export default Layout;
