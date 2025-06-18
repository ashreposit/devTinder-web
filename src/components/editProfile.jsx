import { useState } from "react";
import { BASE_URL } from "../utils/constants";
import UserCard from "./userCard";
import axios from "axios";
import { useDispatch } from "react-redux";
import { addUser } from "../utils/userSlice";
import { useNavigate } from "react-router-dom";

const EditProfile = (user) => {
  
  const [_id,setId] = useState(user?.user?._id);
  const [firstName,setFirstName] = useState(user?.user?.firstName);
  const [lastName,setLastName] = useState(user?.user?.lastName);
  const [age,setAge] = useState(user?.user?.age || '');
  const [gender,setGender] = useState(user?.user?.gender || '');
  const [about,setAbout] = useState(user?.user?.about || '');
  const [photoUrl,setPhotoUrl] = useState(user?.user?.photoUrl);
  const [showProfileUpdateDialog,setShowProfileUpdateDialog] = useState(false);
  const [error,setError] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const updateUserDetails=async()=>{
    try {
      let res = await axios.patch(`${BASE_URL}/profile/edit`,{firstName,lastName,age,gender,about,photoUrl},{withCredentials:true});

      if(res.status === 200){
        dispatch(addUser(res?.data));
        setShowProfileUpdateDialog(true);
        setTimeout(()=>{
          setShowProfileUpdateDialog(false);
          navigate("/app/feed");
        },3000);
        // navigate("/app/feed");
      }
    } catch (error) {
      setError(error.response.data.Error);
    }
  };
  
  return (
    <div className="flex justify-center my-10 gap-10 p-10">
      <div className="flex justify-center items-center min-h-screen bg-black-100">
        <div className="card bg-base-300 w-96 shadow-xl">
          <div className="card-body">
            <h2 className="card-title justify-center">Edit Profile</h2>
            <div className="flex flex-col items-center gap-4">
              <div className='p-2 w-full'>
                <span className='mb-2 block'>First Name</span>
                <label className="input input-bordered flex items-center gap-2 ">
                  <input type="text" className="grow" placeholder="firstName" value={firstName} onChange={(e) => setFirstName(e.target.value)} />
                </label>
              </div>
              <div className='p-2 w-full'>
                <span className='mb-2 block'>Last Name</span>
                <label className="input input-bordered flex items-center gap-2">
                  <input type="text" className="grow" placeholder="lastName" value={lastName} onChange={(e) => setLastName(e.target.value)} />
                </label>
              </div>
              <div className='p-2 w-full'>
                <span className='mb-2 block'>Photo Url</span>
                <label className="input input-bordered flex items-center gap-2">
                  <input type="text" className="grow" placeholder="photoUrl" value={photoUrl} onChange={(e) => setPhotoUrl(e.target.value)} />
                </label>
              </div>
              <div className='p-2 w-full'>
                <span className='mb-2 block'>Age</span>
                <label className="input input-bordered flex items-center gap-2">
                  <input type="text" className="grow" placeholder="age" value={age} onChange={(e) => setAge(e.target.value)} />
                </label>
              </div>
              <div className='p-2 w-full'>
                <span className='mb-2 block'>Gender</span>
                <label className="input input-bordered flex items-center gap-2">
                  <input type="text" className="grow" placeholder="gender" value={gender} onChange={(e) => setGender(e.target.value)} />
                </label>
              </div>
              <div className='p-2 w-full'>
                <span className='mb-2 block'>About</span>
                <label className="input input-bordered flex items-center gap-2">
                  <input type="text" className="grow" placeholder="about" value={about} onChange={(e) => setAbout(e.target.value)} />
                </label>
              </div>
            </div>
            {error && (
              <p className='text-red-500'>{error}</p>
            )}
            <div className="card-actions justify-center mt-5">
              <button className="btn btn-success rounded-full w-52" onClick={updateUserDetails}>Save Profile</button>
            </div>
          </div>
        </div>
      </div>
      <div>
        <UserCard user={{ _id,firstName, lastName, photoUrl, age, gender, about }} />
      </div>

      {showProfileUpdateDialog && (
        <div className="toast toast-top toast-center">
          <div className="alert alert-success">
            <span>user updated successfully.</span>
          </div>
        </div>
      )
      }
    </div>
  )
}

export default EditProfile