import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { createSocketConnection } from '../utils/clientSocket'
import { useSelector } from 'react-redux';
import axios from 'axios';
import { BASE_URL } from '../utils/constants';

const Chat = () => {
    const { toUserId } = useParams();
    const user = useSelector(store => store.user);
    const userId = user?.user?._id;
    const firstName = user?.user?.firstName;
    const [messages, setMessages] = useState([]);
    const [newMessages, setNewMessages] = useState("");

    const fetchChatMessages = async () => {
        const chat = await axios.get(BASE_URL + "/chat/" + toUserId, {
            withCredentials: true,
        });

        const chatMessages = chat?.data?.messages.map((msg) => {
            const { senderId, text } = msg;
            return {
                firstName: senderId?.firstName,
                lastName: senderId?.lastName,
                text,
            };
        });
        setMessages(chatMessages);
    };
    useEffect(() => {
        fetchChatMessages();
    }, []);

    useEffect(() => {
        if (!userId) return;

        const socket = createSocketConnection();

        // as soon as this page loads , socket connection is made amd join chat event is emitted.
        socket.emit("joinChat", { firstName, userId, toUserId });

        socket.on("messageRecieved", ({ firstName, text }) => {
            setMessages((messages) => [...messages, { firstName, text }]);
        });

        return () => {
            socket.disconnect();
        };
    }, [userId, toUserId]);

    const sendMessage = () => {
        const socket = createSocketConnection();
        socket.emit("sendMessage", { firstName, userId, toUserId, text: newMessages });
        // setMessages((messages) => [...messages, { firstName, text:newMessages }]);
        setNewMessages("");
    }
    console.log({ messages });
    return (
        <div className='w-3/4 mx-auto border border-gray-700 m-5 h-[70vh] flex flex-col'>
            <h1 className='p-5 border-b border-gray-700 font-bold'>Chat</h1>
            <div className='flex-1 overflow-scroll p-5'>
                {messages.map((msg, index) => {
                    return (
                        <div key={index} className="chat chat-start">
                            <div className="chat-header">
                                {msg?.firstName}
                                <time className="text-xs opacity-50"> 2 hours ago</time>
                            </div>
                            <div className="chat-bubble">{msg?.text}</div>
                            <div className="chat-footer opacity-50">Seen</div>
                        </div>
                    )
                })}
            </div>
            <div className='p-5 border-t border-gray-600 flex gap-2 items-center'>
                <input
                    value={newMessages}
                    onChange={(e) => setNewMessages(e.target.value)}
                    className="flex-1 border border-grey-700 text-white rounded p-2"></input>
                <button className='btn btn-primary' onClick={sendMessage}>Send</button>
            </div>
        </div>
    )
}

export default Chat
