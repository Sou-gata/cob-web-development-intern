import React, { useContext, useState } from "react";
import { Table, Tag } from "antd";
import { RxCross1 } from "react-icons/rx";
import { AiFillEdit } from "react-icons/ai";
import { FaTrash } from "react-icons/fa6";
import { FaEye } from "react-icons/fa";
import { Context } from "../Context";
import { makeAsComplete, makeAsIncomplete } from "../utils";
import { IoCheckmark } from "react-icons/io5";

const OtherTodos = () => {
    const { todos, setTodos, setId, setModals } = useContext(Context);
    const [data, setData] = useState([]);
    let temp;
    React.useEffect(() => {
        temp = todos.filter((todo) => {
            return todo.list.toLowerCase() === "other";
        });
        setData(temp);
    }, [todos]);
    const makeIncompleted = async (id) => {
        let res = await makeAsIncomplete(id);
        if (res.success) {
            let newTodos = todos.map((todo) => {
                if (todo.key === id) {
                    return {
                        ...todo,
                        isCompleted: false,
                    };
                }
                return todo;
            });
            setTodos(newTodos);
        } else {
            toast("error", res.message || "Something went wrong");
        }
    };
    const makeCompleted = async (id) => {
        let res = await makeAsComplete(id);
        if (res.success) {
            let newTodos = todos.map((todo) => {
                if (todo.key === id) {
                    return {
                        ...todo,
                        isCompleted: true,
                    };
                }
                return todo;
            });
            setTodos(newTodos);
        } else {
            toast("error", res.message || "Something went wrong");
        }
    };
    const columns = [
        {
            title: "Title",
            dataIndex: "title",
            key: "title",
            width: 250,
            render: (text) => <p>{text}</p>,
        },
        {
            title: "Description",
            dataIndex: "description",
            key: "description",
            width: 500,
        },
        {
            title: "List",
            dataIndex: "list",
            key: "list",
        },
        {
            title: "Status",
            key: "status",
            width: 120,
            dataIndex: "isCompleted",
            render: (_, { isCompleted }) => {
                let color = "green";
                let tag = "completed";
                if (!isCompleted) {
                    color = "volcano";
                    tag = "pending";
                }
                return (
                    <Tag color={color} key={tag}>
                        {tag.toUpperCase()}
                    </Tag>
                );
            },
        },
        {
            title: "Action",
            key: "action",
            render: (_, record) => {
                return (
                    <div className="flex items-center gap-5">
                        {record.isCompleted ? (
                            <RxCross1
                                size={16}
                                color="#dc3545"
                                className="cursor-pointer"
                                onClick={() => makeIncompleted(record.key)}
                            />
                        ) : (
                            <IoCheckmark
                                size={20}
                                color="#28a745"
                                className="cursor-pointer"
                                onClick={() => makeCompleted(record.key)}
                            />
                        )}
                        <AiFillEdit
                            size={20}
                            color="#ffc107"
                            className="cursor-pointer"
                            onClick={() => {
                                setId(record.key);
                                setModals((prev) => {
                                    return { ...prev, isEditModalVisible: true };
                                });
                            }}
                        />
                        <FaTrash
                            size={16}
                            color="#dc3545"
                            className="cursor-pointer"
                            onClick={() => {
                                setId(record.key);
                                setModals((prev) => {
                                    return { ...prev, isDeleteModalVisible: true };
                                });
                            }}
                        />
                        <FaEye
                            size={20}
                            color="#007bff"
                            className="cursor-pointer"
                            onClick={() => {
                                setId(record.key);
                                setModals((prev) => {
                                    return { ...prev, isViewModalVisible: true };
                                });
                            }}
                        />
                    </div>
                );
            },
        },
    ];
    return <Table pagination={false} columns={columns} dataSource={data} scroll={{ y: 550 }} />;
};
export default OtherTodos;
