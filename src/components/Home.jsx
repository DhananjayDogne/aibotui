import Sidebar from "./Sidebar";
import Chat from "./Chat";

const Home = () => {
    return (
        <div className="flex h-[100%] w-[100%]">
            <div className="w-[25%] bg-[#7676ad] h-[100%]">
               <Sidebar />

            </div>
            <div className="w-[75%]">
                <Chat />

            </div>
        </div>
    )
}

export default Home;