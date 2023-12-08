import React, { useContext, useEffect, useState } from "react";
import { Context } from "../Context";
import { Button, Modal, Divider } from "antd";
import { dateToString } from "../utils";

const ViewTodoModal = () => {
    const { modals, setModals, todos, id } = useContext(Context);
    const handleCancel = () => {
        setModals((prev) => {
            return { ...prev, isViewModalVisible: false };
        });
    };
    const [todo, setTodo] = useState([]);
    useEffect(() => {
        for (let i = 0; i < todos.length; i++) {
            if (todos[i].key === id) {
                setTodo(todos[i]);
                break;
            }
        }
    }, [id]);
    return (
        <Modal
            open={modals.isViewModalVisible}
            title="Vew Details"
            onCancel={handleCancel}
            footer={[<div key={Math.random()}></div>]}
        >
            <div className="p-6 border rounded-xl">
                <div className="flex items-center gap-3">
                    <p className="text-base font-bold">Titile:</p>
                    <p>{todo.title}</p>
                </div>
                <Divider />
                <div className="flex items-center gap-3">
                    <p className="text-base font-bold">Description:</p>
                    <p>{todo.description}</p>
                </div>
                <Divider />
                <div className="flex items-center gap-3">
                    <p className="text-base font-bold">List:</p>
                    <p>{todo.list}</p>
                </div>
                <Divider />
                <div className="flex items-center gap-3">
                    <p className="text-base font-bold">Date:</p>
                    <p>{dateToString(todo.date)}</p>
                </div>
                <Divider />
                <div className="flex items-center gap-3">
                    <p className="text-base font-bold">Status:</p>
                    <p>{todo.isCompleted ? "Completed" : "Pending"}</p>
                </div>
                <Divider />
                <div className="mt-7 flex justify-center">
                    <Button
                        type="primary"
                        className="bg-blue-500 text-white hover:text-white"
                        onClick={handleCancel}
                    >
                        Close
                    </Button>
                </div>
            </div>
        </Modal>
    );
};

export default ViewTodoModal;
