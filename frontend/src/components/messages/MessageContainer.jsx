import { useEffect } from "react";
// import useConversation from "../../zustand/useConversation";
import MessageInput from "./MessageInput";
import Messages from "./Messages";
import {TiMessages} from "react-icons/ti";
import { useAuthContext } from "../../context/AuthContext";

const MessageContainer = () => {
    const {selectedConversation, setSelectedConversation} = useAuthContext();

    useEffect(()=>{ // This effect runs when the component mounts
        return ()=>setSelectedConversation(null); // Also runs the return () => { ... } part when the component unmounts (is removed from screen).
    },[setSelectedConversation]);

    return (
        <div className='w-full h-[100vh] sm:h-full sm:min-w-[450px] flex flex-col'>
            {!selectedConversation ? (<NoChatSelected /> ): (
                <>
                    {/* Header */}
                    <div className='bg-slate-500 px-4 py-2 mb-2'>
                        <span className='label-text'>To:</span> <span className='text-gray-900 font-bold'>{selectedConversation.fullName}</span>
                    </div>

                    <Messages />
                    <MessageInput /> 
                </>
            )}
        </div>
    );
};

const NoChatSelected = () => {
    const { authUser } = useAuthContext();
    return (
        <div className='flex items-center justify-center w-full h-full'>
            <div className='px-4 text-center sm:text-lg md:text-xl text-gray-200 font-semibold flex flex-col items-center gap-2'>
                <p>Welcome 👋 {authUser.fullName} ❄</p>
                <p>Select a chat to start messaging</p>
                <TiMessages className='text-3xl md:text-6xl text-center' />
            </div>
        </div>
    );
};

export default MessageContainer;