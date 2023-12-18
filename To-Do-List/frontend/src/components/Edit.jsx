import React, { useState, useContext, useEffect } from "react";
import { Button, DatePicker, Input, Select } from "antd";
import axios from "axios";
import { Context } from "../Context";
import toast, { dateToString } from "../utils";
import baseUrl from "../baseUrl";
import dayjs from "dayjs";

const Edit = () => {
    const { todos, setTodos, id, setModals } = useContext(Context);
    const empty = {
        title: "",
        description: "",
        list: "other",
        date: "",
        isCompleted: false,
    };
    const [todo, setTodo] = useState(empty);
    useEffect(() => {
        let data;
        for (let i = 0; i < todos.length; i++) {
            if (todos[i].key === id) {
                data = todos[i];
                break;
            }
        }
        setTodo({
            title: data.title,
            description: data.description,
            list: data.list,
            date: dayjs(dateToString(data.date), "YYYY-MM-DD"),
            isCompleted: data.isCompleted,
            key: data.key,
        });
    }, [id]);

    const updateData = async () => {
        try {
            if (!todo.title || !todo.description || !todo.date) {
                toast("error", "Please fill all the fields");
                return;
            }
            const res = await axios.patch(`${baseUrl}/api/todo/${id}`, {
                ...todo,
                date: todo.date,
            });
            if (res.data.success) {
                let newTodo = res.data.todo;
                let newTodos = todos.map((todo) => {
                    if (todo.key === id) {
                        return {
                            ...todo,
                            title: newTodo.title,
                            description: newTodo.description,
                            list: newTodo.list,
                            date: newTodo.date,
                            isCompleted: newTodo.isCompleted,
                        };
                    }
                    return todo;
                });
                setTodos(newTodos);
                toast("success", "Todo updated successfully");
                setModals((prev) => {
                    return { ...prev, isEditModalVisible: false };
                });
            } else {
                toast("error", res.data.message || "Something went wrong");
            }
        } catch (error) {
            toast("error", error.message || "Something went wrong");
        }
    };

    return (
        <div className="flex flex-col items-center">
            <p className="text-center font-semibold text-xl">Edit Todo</p>
            <div className="p-6 flex flex-col gap-3 mt-5 border-[1px] rounded-xl">
                <div className="flex gap-3 items-center">
                    <div className="w-20">
                        <div className="text-right">Title: </div>
                    </div>
                    <div>
                        <Input
                            placeholder="Title"
                            className="w-[250px]"
                            value={todo.title}
                            onChange={(e) => setTodo({ ...todo, title: e.target.value })}
                        />
                    </div>
                </div>
                <div className="flex gap-3 items-center">
                    <div className="w-20">
                        <p className="text-right">Description: </p>
                    </div>
                    <div>
                        <Input
                            placeholder="Description"
                            className="w-[250px]"
                            value={todo.description}
                            onChange={(e) => setTodo({ ...todo, description: e.target.value })}
                        />
                    </div>
                </div>
                <div className="flex gap-3 items-center">
                    <div className="w-20">
                        <p className="text-right">List: </p>
                    </div>
                    <Select
                        defaultValue="other"
                        value={todo.list}
                        onChange={(e) => setTodo({ ...todo, list: e })}
                    >
                        <Select.Option value="personal">Personal</Select.Option>
                        <Select.Option value="work">Work</Select.Option>
                        <Select.Option value="other">Others</Select.Option>
                    </Select>
                </div>
                <div className="flex gap-3 items-center">
                    <p className="w-20 text-right">Date: </p>
                    <DatePicker
                        value={todo.date}
                        onChange={(e) => {
                            setTodo({ ...todo, date: e.$d });
                        }}
                    />
                </div>
                <div className="flex items-center justify-center mt-5">
                    <Button type="primary" className="bg-blue-500 text-white" onClick={updateData}>
                        Update
                    </Button>
                </div>
            </div>
        </div>
    );
};

export default Edit;
