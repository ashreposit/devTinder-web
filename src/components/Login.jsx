import axios from 'axios';
import { useState } from 'react'
import { useDispatch } from 'react-redux';
import { addUser } from '../utils/userSlice';
import { useNavigate } from 'react-router-dom';
import { BASE_URL } from '../utils/constants';

const Login = () => {

  const navigate = useNavigate();//hook
  const dispatch = useDispatch(); // to add data to store 
  const [emailId, setEmailId] = useState("");
  const [password, setPassword] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [isLoginForm, setIsLoginForm] = useState(false);
  const [error, setError] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showSuccessToast, setShowSuccessToast] = useState(false);

  const handleLogin = async () => {

    try {
      let res = await axios.post(BASE_URL + "/auth/login", { emailId, password }, { withCredentials: true });
      dispatch(addUser(res?.data.user)); //sending actions(data/state) to the user
      return navigate("/app/feed");
    }
    catch (err) {
      setError(err.response.data.Error);
      console.log({ Error: err.response.data.Error });
    }
  };

  const handleSignUp = async () => {

    try {
      const signIn = await axios.post(`${BASE_URL}/auth/signup`, { firstName, lastName, emailId, password }, { withCredentials: true });
      dispatch(addUser(signIn?.data.user));
      setShowSuccessToast(true);
      setTimeout(() => {
        setShowSuccessToast(false);
        return navigate('/app/profile');
      }, 2000);
    } catch (error) {
      setError(error.response.data.Error);
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-black-100">
      <div className="card bg-base-300 w-96 shadow-xl">
        <div className="card-body">
          <h2 className="card-title justify-center">{isLoginForm ? 'Sign In to DevTinder' : 'Sign Up with DevTinder'}</h2>
          <div className="flex flex-col items-center gap-4">
            {!isLoginForm && (
              <>
                <div className='p-2 w-full'>
                  <span className='mb-2 block'>First Name</span>
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
                    <input type="text" className="grow" placeholder="firstName" value={firstName} onChange={(e) => setFirstName(e.target.value)} />
                  </label>
                </div>
                <div className='p-2 w-full'>
                  <span className='mb-2 block'>Last Name</span>
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
                    <input type="text" className="grow" placeholder="LastName" value={lastName} onChange={(e) => setLastName(e.target.value)} />
                  </label>
                </div>
              </>
            )}
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
                <input type="text" className="grow" placeholder="Email" value={emailId} onChange={(e) => setEmailId(e.target.value)} />
              </label>
            </div>
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
                <input type={showPassword ? "text" : "password"} className="grow" defaultValue="" placeholder="password" value={password} onChange={(e) => setPassword(e.target.value)} />
                <button type='button' onClick={() => setShowPassword(!showPassword)} className="focus:outline-none">
                  {showPassword ? (
                    // Eye-Off Icon
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="h-5 w-5 text-gray-500">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.875 18.825A10.05 10.05 0 0112 19c-5.523 0-10-4.477-10-10a9.963 9.963 0 011.663-5.505M15 12a3 3 0 11-6 0 3 3 0 016 0zm-9.615 6.615L3 21m0 0l3.585-3.585m-.585 3.585L3 17.415" />
                    </svg>
                  ) : (
                    // Eye Icon
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="h-5 w-5 text-gray-500">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0zm7.5 0a9.994 9.994 0 00-19 0 9.994 9.994 0 0019 0z" />
                    </svg>
                  )}
                </button>
              </label>
            </div>
          </div>
          <p className='text-red-500'>{error}</p>
          <div className="card-actions justify-center mt-5">
            <button className="btn btn-success rounded-full w-52" onClick={isLoginForm ? handleLogin : handleSignUp}>{isLoginForm ? 'Login' : 'SignUp'}</button>
          </div>
          <div className="my-4">
            <hr className="border-t border-gray-700" />
            <p className="mt-2 text-sm text-gray-300 text-center cursor-pointer hover:text-gray-500 transition-colors duration-200" onClick={() => setIsLoginForm((value) => !value)}>
              {isLoginForm ? 'Not on DevTinder? Sign Up!' : 'Already an User? Sign In!'}
            </p>
          </div>
        </div>
      </div>
      {showSuccessToast && (
        <div className="toast toast-top toast-center">
          <div className="alert alert-success">
            <span>{isLoginForm ? 'Logged In successfully.' : 'Signed In successfully.'}</span>
          </div>
        </div>
      )
      }
    </div>
  )
}

export default Login
