import React, { useContext, useState } from "react";
import { Context } from "../Context";
import { Modal, Button, DatePicker, Input, Select } from "antd";
import axios from "axios";
import baseUrl from "../baseUrl";
import toast from "../utils";

const AddTodoModel = () => {
    const { modals, setModals, setTodos } = useContext(Context);
    const empty = {
        title: "",
        description: "",
        list: "other",
        date: "",
        isCompleted: false,
    };
    const [todo, setTodo] = useState(empty);
    const addData = async () => {
        try {
            if (!todo.title || !todo.description || !todo.date) {
                toast("error", "Please fill all the fields");
                return;
            }
            const res = await axios.post(`${baseUrl}/api/add`, { ...todo, date: todo.date });
            if (res.data.success) {
                let newTodo = res.data.todo;
                setTodos((prev) => [
                    ...prev,
                    {
                        title: newTodo.title,
                        description: newTodo.description,
                        list: newTodo.list,
                        date: newTodo.date,
                        isCompleted: newTodo.isCompleted,
                        key: newTodo._id,
                    },
                ]);

                toast("success", "Todo added successfully");
                setTodo(empty);
            } else {
                toast("error", res.data.message || "Something went wrong");
            }
        } catch (error) {
            toast("error", error.message || "Something went wrong");
        }
    };
    const handleCancel = () => {
        setModals((prev) => {
            return { ...prev, isAddModalVisible: false };
        });
        setTodo(empty);
    };
    return (
        <Modal
            open={modals.isAddModalVisible}
            title=""
            onCancel={handleCancel}
            footer={[<div key={Math.random()}></div>]}
        >
            <div className="p-4 w-full flex flex-col items-center">
                <p className="text-center font-semibold text-xl">Add a todo</p>
                <div className="p-6 flex flex-col gap-3 mt-10 border-[1px] rounded-xl">
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
                            onChange={(e) => {
                                setTodo({ ...todo, date: e.$d });
                            }}
                            // value={dayjs(dateToString(todo.date), "YYYY-MM-DD")}
                        />
                    </div>
                    <div className="flex items-center justify-center mt-5">
                        <Button type="primary" className="bg-blue-500 text-white" onClick={addData}>
                            Add
                        </Button>
                    </div>
                </div>
            </div>
        </Modal>
    );
};

export default AddTodoModel;
