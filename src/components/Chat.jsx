import {BsSendFill} from "react-icons/bs";

const Chat = () => {
    return (
        <div className="flex h-[91.4vh]">
            <div className=" h-[43px] w-[100%] mt-auto">
                <div className="flex  px-1 py-2 h-[55px] w-[100%] bg-[#7676ad]">
                    <input type="text" placeholder="Type a message" className="w-[80%] outline-none rounded-full bg-white px-2" />
                    <button className="bg-white rounded-full text-center m-auto h-[100%] align-center  w-[3.5rem] ">
                        <BsSendFill className="text-[#0c0c98] m-auto  text-2xl mt-1" />
                    </button>
                </div>
            </div>
        </div>
    )
}

export default Chat;