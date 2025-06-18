import axios from "axios";
import { BASE_URL } from "../utils/constants";
import { useDispatch, useSelector } from "react-redux";
import { removeUserFromFeed } from "../utils/feedSlice";

const userCard = ({user}) => {

  const dispatch = useDispatch();
  const loggedInUser = useSelector((store)=> store.user);

  const sendRequestReview = async(status,userId)=>{
    try {
      let sendRequest = await axios.post(`${BASE_URL}/request/send/${status}/${userId}`,{},{withCredentials:true})
      dispatch(removeUserFromFeed(userId));
    } catch (error) {
      console.log(error.message);
    }
  };

  return (
    <div className="card bg-base-300 w-96 shadow-sm gap-10 p-10">
      <figure>
        <img
          src= {user?.photoUrl}
          alt={user?.firstName} />
      </figure>
      <div className="card-body">
        <h2 className="card-title">{user?.firstName + " " + user?.lastName}</h2>
        {user?.age && user?.gender && (<p>{user?.age + " " + user?.gender}</p>)}
        <p>{user?.about}</p>
        {user?._id && loggedInUser?.user?._id && user._id !== loggedInUser?.user?._id  && (
          <div className="card-actions justify-center my-4">
          <button className="btn btn-secondary" onClick={()=>{sendRequestReview("ignored",user?._id)}}>Ignore</button>
          <button className="btn btn-primary" onClick={()=>{sendRequestReview("interested",user?._id)}}>Interested</button>
        </div>
      )}
      </div>
    </div>
  )
}

export default userCard