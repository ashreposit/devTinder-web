import axios from 'axios';
import { useSelector } from 'react-redux'
import { Link, useNavigate } from 'react-router-dom';
import { BASE_URL } from '../utils/constants';
import { useState } from 'react';

const NavBar = () => {

    const user = useSelector((store) => store.user);
    const navigate = useNavigate();
    const [showLogoutDialog,setShowLogoutDialog] = useState(false);

    const logOut = async ()=>{
        console.log({INFO:'logout function called'});
        await axios.post(`${BASE_URL}/auth/logout`,{},{withCredentials:true});
        setShowLogoutDialog(true);
    };

    const closeDialog = ()=>{
        setShowLogoutDialog(false);
        navigate('/');
    };

    return (
        <div>
            <div className="navbar bg-base-300">
                <div className="flex-1">
                    <Link to="/app/feed" className="btn btn-ghost text-xl">DevTinder</Link>
                </div>
                {user && (
                    <div className="flex-none gap-2">
                        <div className='form-control'>welcome,{user?.user?.firstName}!</div>
                        <div className="dropdown dropdown-end mx-7">
                            <div tabIndex={0} role="button" className="btn btn-ghost btn-circle avatar">
                                <div className="w-10 rounded-full">
                                    <img
                                        alt="Tailwind CSS Navbar component"
                                        src={user?.user?.photoUrl} />
                                </div>
                            </div>
                            <ul
                                tabIndex={0}
                                className="menu menu-sm dropdown-content bg-base-100 rounded-box z-[1] mt-3 w-52 p-2 shadow">
                                <li>
                                    <Link to="/app/profile" className="justify-between">
                                        Profile
                                        {/* <span className="badge">New</span> */}
                                    </Link>
                                </li>
                                <li><a>Settings</a></li>
                                <li><a onClick={logOut}>Logout</a></li>
                            </ul>
                        </div>
                    </div>
                )}
            </div>

            {showLogoutDialog &&(
                <dialog id="logout-modal" className='modal modal-open'>
                    <div className="modal-box">
                        <h3 className='font-bold text-lg'>Logged Out.</h3>
                        <p className='py-4'>You have been logged out successfully.</p>
                        <div className="modal-action">
                            <button className="btn btn-primary" onClick={closeDialog}>
                                ok
                            </button>
                        </div>
                    </div>
                </dialog>
            )}
        </div>
    )
}

// Link is from react router dom which is similar to a tag . Here to use Link to="redirect route" which when clicked is redirected to the given route.

export default NavBar
