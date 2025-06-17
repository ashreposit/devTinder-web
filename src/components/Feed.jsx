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
      dispatch(addFeed(res.data));
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
  return ( feed && (
    <div className='flex justify-center my-10 gap-10 p-10'>
      {feed.feed.map((user,index)=>(
        <UserCard key={index || user._id} user={user}/>
      ))}
    </div>
    )
  )
}

export default Feed