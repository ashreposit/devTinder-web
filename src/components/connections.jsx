import axios from 'axios'
import { useEffect } from 'react'
import { BASE_URL } from '../utils/constants'
import { useDispatch, useSelector } from 'react-redux';
import { addConnection } from '../utils/connectionSlice';

const Connections = () => {

  const dispatch = useDispatch();
  const connection = useSelector((store)=> store.connection);

  const connections = async()=>{ 
    try {
      console.log({info:"connections called"});
      let res = await axios.get(`${BASE_URL}/user/connections/received`,{withCredentials:true});
      console.log({res:res.data});
      if(res.status === 200){
        dispatch(addConnection(res.data));
      }
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(()=>{
    connections();
  },[]);

  if(connection?.connectionRequests.length === 0) return <h1 className='flex justify-center my-10 text-bold text-3xl'>No Connection Found</h1>

  return (
    <div className='text-center my-10'>
      <h1 className='text-bold text-5xl'>Connections</h1>

      {connection?.connectionRequests.map((conn, index) => {
        return (
        <div key={conn.id || index} className=" flex m-4 p-4 rounded bg-base-300 w-1/2 mx-auto">
          <div>
            <img
              src={conn.photoUrl}
              alt={`${conn.firstName || "User"}'s photo`}
              className="w-20 h-20 object-cover rounded-full border"
            />
          </div>
          <div className='text-left mx-4'>
            <h2 className='font-bold text-xl'>{conn.firstName + ' ' + conn.lastName}</h2>
            {conn.age && conn.gender && <p>{conn.age + ' ' + conn.gender}</p>}
            <p>{conn.about}</p>
          </div>

        </div>
      )})}
    </div>
  )
}

export default Connections