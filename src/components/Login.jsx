import axios from 'axios';
import React, { useState } from 'react'
import { useDispatch } from 'react-redux';
import { addUser } from '../utils/userSlice';
import { useNavigate } from 'react-router-dom';
import { BASE_URL } from '../utils/constants';

const Login = () => {
  
  const navigate  = useNavigate();//hook
  const [emailId,setEmailId] = useState("");
  const [password,setPassword] = useState("");
  const dispatch = useDispatch(); // to add data to store 

  const handleSignup = async ()=>{
    console.log("function called");
    try{
      let res = await axios.post(BASE_URL+"/auth/login",{emailId,password},{withCredentials:true});
      dispatch(addUser(res.data)); //sending actions(data/state) to the user
      navigate("/");
    }
    catch(err){
      console.log(err);
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-black-100">
      <div className="card bg-base-300 w-96 shadow-xl">
        <div className="card-body">
          <h2 className="card-title justify-center">Sign In to DevTinder</h2>
          <div className="flex flex-col items-center gap-4">
            <div className='p-2 w-full'>
              <span className='mb-2 block'>Email Id</span>
              <label className="input input-bordered flex items-center gap-2 ">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 16 16"
                  fill="currentColor"
                  className="h-4 w-4 opacity-70">
                  <path
                    d="M2.5 3A1.5 1.5 0 0 0 1 4.5v.793c.026.009.051.02.076.032L7.674 8.51c.206.1.446.1.652 0l6.598-3.185A.755.755 0 0 1 15 5.293V4.5A1.5 1.5 0 0 0 13.5 3h-11Z" />
                  <path
                    d="M15 6.954 8.978 9.86a2.25 2.25 0 0 1-1.956 0L1 6.954V11.5A1.5 1.5 0 0 0 2.5 13h11a1.5 1.5 0 0 0 1.5-1.5V6.954Z" />
                </svg>
                <input type="text" className="grow" placeholder="Email" value={emailId} onChange={(e)=>setEmailId(e.target.value)}/>
              </label>
            </div>
            {/* <div className='p-2 w-full'>
              <label className="input input-bordered flex items-center gap-2">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 16 16"
                  fill="currentColor"
                  className="h-4 w-4 opacity-70">
                  <path
                    d="M8 8a3 3 0 1 0 0-6 3 3 0 0 0 0 6ZM12.735 14c.618 0 1.093-.561.872-1.139a6.002 6.002 0 0 0-11.215 0c-.22.578.254 1.139.872 1.139h9.47Z" />
                </svg>
                <input type="text" className="grow" placeholder="Username" />
              </label>
            </div> */}
            <div className='p-2 w-full'>
              <span className='mb-2 block'>Password</span>
              <label className="input input-bordered flex items-center gap-2">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 16 16"
                  fill="currentColor"
                  className="h-4 w-4 opacity-70">
                  <path
                    fillRule="evenodd"
                    d="M14 6a4 4 0 0 1-4.899 3.899l-1.955 1.955a.5.5 0 0 1-.353.146H5v1.5a.5.5 0 0 1-.5.5h-2a.5.5 0 0 1-.5-.5v-2.293a.5.5 0 0 1 .146-.353l3.955-3.955A4 4 0 1 1 14 6Zm-4-2a.75.75 0 0 0 0 1.5.5.5 0 0 1 .5.5.75.75 0 0 0 1.5 0 2 2 0 0 0-2-2Z"
                    clipRule="evenodd" />
                </svg>
                <input type="password" className="grow" defaultValue="" placeholder="password" value={password} onChange={(e)=>setPassword(e.target.value)}/>
              </label>
            </div>
          </div>
          <div className="card-actions justify-center mt-5">
            <button className="btn btn-success rounded-full w-52" onClick={handleSignup}>Login</button>
          </div>
          <div className="my-4">
            <hr className="border-t border-gray-700" />
            <p className="mt-2 text-sm text-gray-500 text-center">
              Not on DevTinder? <a href="/signup" className="text-primary font-semibold">Sign Up!</a>
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Login
