import React, { useContext } from "react";
import { Context } from "../Context";
import { Modal } from "antd";
import axios from "axios";
import baseUrl from "../baseUrl";
import toast from "../utils";

const DeleteTodoModal = () => {
    const { id, modals, setModals, todos, setTodos } = useContext(Context);
    const handleCancel = () => {
        setModals((prev) => {
            return { ...prev, isDeleteModalVisible: false };
        });
    };
    const deleteTodo = async () => {
        try {
            const res = await axios.delete(`${baseUrl}/api/todo/${id}`);
            if (res.data.success) {
                let newTodos = todos.filter((todo) => todo.key !== id);
                setTodos(newTodos);
                setModals((prev) => {
                    return { ...prev, isDeleteModalVisible: false };
                });
                toast("success", "Todo deleted successfully");
            }
        } catch (error) {
            toast("error", error.message || "Something went wrong");
        }
    };
    return (
        <Modal
            open={modals.isDeleteModalVisible}
            title="Confirm"
            onCancel={handleCancel}
            footer={[
                <div key={Math.random()}>
                    <button
                        className="bg-red-500 px-3 py-1 rounded text-white mr-2"
                        onClick={handleCancel}
                    >
                        Cancel
                    </button>
                    <button
                        className="bg-[#28a745] px-3 py-1 rounded text-white"
                        onClick={() => deleteTodo()}
                    >
                        Confirm
                    </button>
                </div>,
            ]}
        >
            <p>Are you sure you want to delete ?</p>
        </Modal>
    );
};

export default DeleteTodoModal;
