import axios from 'axios'
import { BASE_URL } from '../utils/constants'
import { useDispatch, useSelector } from 'react-redux'
import { addFeed } from '../utils/feedSlice';
import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';
import UserCard from './userCard';

const Feed = () => {

  const dispatch = useDispatch();
  const feed = useSelector((store)=> store.feed);
  const navigate = useNavigate();

  const getFeed = async()=>{
    if(feed) return;
    try {
      let res = await axios.get(`${BASE_URL}/user/feed`,{withCredentials:true});
      dispatch(addFeed(res.data.feed));
    } catch (error) {
      if (error.status === 401) {
        navigate('/');
      }
      console.log(error);
    }
  }

  useEffect(()=>{
    getFeed();
  },[]);

  if(feed?.length <= 0) return <h1 className="flex justify-center my-10 text-bold text-3xl">Your Feed is Empty</h1>

  return ( feed && (
    <div className='flex justify-center my-10 gap-10 p-10'>
      <UserCard user={feed[0]}/>
    </div>
    )
  )
}

export default Feed