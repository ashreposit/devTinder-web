import NavBar from './NavBar';
import { Outlet, useNavigate } from 'react-router-dom';
import Footer from './Footer';
import axios from 'axios';
import { BASE_URL } from '../utils/constants';
import { useDispatch, useSelector } from 'react-redux';
import { addUser } from '../utils/userSlice';
import { useEffect } from 'react';

const Body = () => {

  const dispatch = useDispatch(); // to add data to store 
  const navigate = useNavigate();
  const userData = useSelector((store)=> store.user);

  // getting the user details even while reloading the application.
  const getLoggedInUser = async () => {
    try {
      let user = await axios.get(`${BASE_URL}/profile/view`, { withCredentials: true });
      dispatch(addUser(user?.data));
    } catch (error) {
      if (error.status === 401) {
        navigate('/');
      }
      console.log(error);
    }
  };

  // getLoggedInUser function is called when the component loads initially only if no use data is fecthed.
  useEffect(() => {
    if (!userData?.user) {
      getLoggedInUser();
    }
  }, []);

  return (
    <div className='min-h-screen flex flex-col'>
      <NavBar />
      <main className="flex-grow">
        <Outlet />
      </main>
      <Footer />
    </div>
  )
}

export default Body
