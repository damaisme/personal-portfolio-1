import {BsFillMoonStarsFill} from 'react-icons/bs'
export default function Navbar(){
    return (
        <nav className="fixed top-0 left-0 w-full bg-white shadow-sm px-8 md:px-20 lg:px-40 py-4 flex justify-between items-center z-50">
            <h1 className="font-burtons text-lg">DENDI</h1>
            <ul className="flex items-center">
                <li><BsFillMoonStarsFill /></li>
                <a className="px-4 py-2 bg-gradient-to-r from-cyan-500 text- to-teal-500 bg-blue-300 rounded-md ml-8 text-white" href="#">Resume</a>
            </ul>
        </nav>
    )
}