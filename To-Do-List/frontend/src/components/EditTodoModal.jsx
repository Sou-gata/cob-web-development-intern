import React, { useContext } from "react";
import Edit from "./Edit";
import { Context } from "../Context";
import { Modal } from "antd";

const EditTodoModal = () => {
    const { modals, setModals } = useContext(Context);
    const handleCancel = () => {
        setModals((prev) => {
            return { ...prev, isEditModalVisible: false };
        });
    };
    return (
        <Modal
            open={modals.isEditModalVisible}
            title=""
            onCancel={handleCancel}
            footer={[<div key={Math.random()}></div>]}
        >
            <Edit />
        </Modal>
    );
};

export default EditTodoModal;
