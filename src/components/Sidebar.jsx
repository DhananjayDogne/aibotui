import { useNavigate } from 'react-router-dom';

const Sidebar = () => {
    const navigate=useNavigate();
    return (
        <div className=" h-[92vh]">
            <div className="m-2 py-2 bg-white h-[45px] rounded-full text-center text-[#0c0c98] text-bold hover:bg-[#cfb2cf] cursor-pointer" onClick={()=>navigate('/sidenav')}>
                Chat with Ai
            </div>
            <div className="m-2 py-2 bg-white h-[45px] rounded-full text-center text-[#0c0c98] text-bold hover:bg-[#cfb2cf] cursor-pointer" onClick={()=>navigate('/snap')}>
                Send A Snap 
            </div>
            <div className="m-2 py-2 bg-white h-[45px] rounded-full text-center text-[#0c0c98] text-bold hover:bg-[#cfb2cf] cursor-pointer" onClick={() => navigate('/room/1')}>
                Schedule a meet
            </div>
            

        </div>
    )
}

export default Sidebar;