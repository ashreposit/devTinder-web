import { useSelector } from "react-redux";
import EditProfile from "./editProfile";

const Profile = () => {
  const userDetails = useSelector((store) => store.user);
  return (
    <>
      {userDetails && (
        <div>
          <EditProfile user={userDetails?.user} />
        </div>
      )}
    </>
  )
}

export default Profile;