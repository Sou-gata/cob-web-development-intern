import React, { createContext, useState } from "react";

const Context = createContext();

const ContextProvider = ({ children }) => {
    const [todos, setTodos] = useState([]);
    const [modals, setModals] = useState({
        isAddModalVisible: false,
        isEditModalVisible: false,
        isDeleteModalVisible: false,
        isViewModalVisible: false,
    });
    const [id, setId] = useState(null);
    return (
        <Context.Provider value={{ todos, setTodos, modals, setModals, id, setId }}>
            {children}
        </Context.Provider>
    );
};

export default ContextProvider;
export { Context };
