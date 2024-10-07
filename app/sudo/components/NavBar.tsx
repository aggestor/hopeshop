import { BsArrow90DegDown, BsCheck2All, BsListNested, BsMenuDown, BsPeople, BsPerson, BsStack, BsTools, BsTv } from "react-icons/bs";
import SideBarItem from "./SideBarItem"
import { FaSellcast, FaUserAlt } from "react-icons/fa";

const NavBar = () =>{
    return <nav className='w-[17.5%] h-full py-2 px-3 bg-gray-100 '>
            <h1 className="text-2xl mb-5 font-semibold text-black-600">Hope shop</h1>
            <div className=" bg-white p-2 mb-3 overflow-hidden rounded-xl">
                <SideBarItem name='Dashboard' route='/sudo' Icon={<BsTv className="w-5 h-5" />} />
            </div>
            <div className=" bg-white p-2 overflow-hidden rounded-xl">
                <SideBarItem name='Arrivals' route='/sudo/arrivals' Icon={<BsArrow90DegDown className="w-5 h-5" />} />
                <SideBarItem name='Sells' route='/sudo/sells' Icon={<BsCheck2All className="w-5 h-5" />} />
                <SideBarItem name='Stocks' route='/sudo/stocks' Icon={<BsStack className="w-5 h-5" />} />
            </div>
            <div className=" bg-white p-2 mt-3 overflow-hidden rounded-xl">
                <SideBarItem name='Categorization' route='/sudo/categories' Icon={<BsListNested className="w-5 h-5" />} />
                <SideBarItem name='Products' route='/sudo/prod' Icon={<BsMenuDown className="w-5 h-5" />} />
            </div>
            <div className=" bg-white p-2 mt-3 overflow-hidden rounded-xl">
                <SideBarItem name='Users' route='/sudo/users' Icon={<BsPeople className="w-5 h-5" />} />
                <SideBarItem name='Admins' route='/sudo/admins' Icon={<BsPerson className="w-5 h-5" />} />
                <SideBarItem name='Settings' route='/sudo/settings' Icon={<BsTools className="w-5 h-5" />} />
            </div>
    </nav>
}
export default NavBar