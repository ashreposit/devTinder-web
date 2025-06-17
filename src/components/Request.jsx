import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { addRequest } from '../utils/requestSlice';
import axios from 'axios';
import { BASE_URL } from '../utils/constants';

const Request = () => {

    const dispatch = useDispatch();
    const requests = useSelector((store) => store.request);

    const getRequests = async () => {
        try {
            let request = await axios.get(`${BASE_URL}/user/request/received`, { withCredentials: true });
            dispatch(addRequest(request.data));
        } catch (error) {
            console.log(error);
        }
    };

    useEffect(() => {
        getRequests();
    }, []);

    if (requests?.connectionRequests.length === 0) return <h1 className='flex justify-center my-10 text-bold text-3xl'>No Requests Found</h1>

    return (
        <div className='text-center my-10'>
            <h1 className='text-bold text-5xl'>Connections Requests</h1>

            {requests?.connectionRequests.map((conn, index) => {
                return (
                    <div key={conn._id || index} className=" flex justify-around items-center m-4 p-4 rounded bg-base-300 w-2/3 mx-auto">
                        <div>
                            <img
                                src={conn.fromUserId.photoUrl}
                                alt={`${conn.fromUserId.firstName || "User"}'s photo`}
                                className="w-20 h-20 object-cover rounded-full border"
                            />
                        </div>
                        <div className='text-left mx-4'>
                            <h2 className='font-bold text-xl'>{conn.fromUserId.firstName + ' ' + conn.fromUserId.lastName}</h2>
                            {conn.fromUserId.age && conn.fromUserId.gender && <p>{conn.fromUserId.age + ' ' + conn.fromUserId.gender}</p>}
                            <p>{conn.fromUserId.about}</p>
                        </div>
                        <div>
                            <button className='btn btn-primary mx-2'>Accept</button>
                            <button className='btn btn-secondary mx-2'>Ignore</button>
                        </div>

                    </div>
                )
            })}
        </div>
    )
}

export default Request
