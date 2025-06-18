import axios from 'axios'
import { useEffect, useState } from 'react'
import { BASE_URL } from '../utils/constants'
import { useDispatch, useSelector } from 'react-redux';
import { addConnection, removeConnection } from '../utils/connectionSlice';

const Connections = () => {

  const dispatch = useDispatch();
  const connection = useSelector((store)=> store.connection);
  const [deleteSuccess,setDeleteSuccess] = useState(false);

  const connections = async()=>{ 
    try {

      let res = await axios.get(`${BASE_URL}/user/connections`,{withCredentials:true});
      console.log({res:res.data});
      if(res.status === 200){
        dispatch(addConnection(res.data.connectionRequest));
      }
    } catch (error) {
      console.log(error);
    }
  }
  
    const deleteConnection = async(connectionId)=>{
    try {
      let deleteResponse = await axios.delete(`${BASE_URL}/user/connections/${connectionId}`,{withCredentials:true});
      dispatch(removeConnection(connectionId));
      if (deleteResponse.status === 200) {
        setDeleteSuccess(true);
        setTimeout(() => {
          setDeleteSuccess(false);
        }, 1000);
      }
    } catch (error) {
      console.log({Error:error});
    }
  };

  useEffect(()=>{
    connections();
  },[]);

  if(connection?.length === 0) return <h1 className='flex justify-center my-10 text-bold text-3xl'>No Connection Found</h1>

  return (
    <div className='text-center my-10'>
      <h1 className='text-bold text-5xl'>Connections</h1>

      {connection?.map((conn, index) => {
        return (
        <div key={conn.id || index} className=" flex justify-around m-4 p-4 rounded bg-base-300 w-1/2 mx-auto">
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
          <div className="card-actions justify-center my-4">
              <button className="btn btn-secondary" onClick={()=>deleteConnection(conn?.connectionId)}>Delete</button>
          </div>
        </div>
        
      )})}

      {deleteSuccess && (
        <div className="toast toast-top toast-center">
          <div className="alert alert-success">
            <span>Connection deleted successfully.</span>
          </div>
        </div>
      )}
    </div>
  )
}

export default Connections