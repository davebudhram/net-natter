import React from "react";
import {useParams, useNavigate} from "react-router-dom";
import {useUser} from "../../contexts/UserContext";
import "./Account.css";
import {
  getUserById,
  followUser,
  unfollowUser,
  getUserFollowers,
  getUserFollowees,
} from "../../services/UserService";
import FollowerTable from "./Follow/followerTable";
import FollowingTable from "./Follow/followingTable";
import {IUser} from "../../interfaces/user";

function Account() {
  const {accountId} = useParams();
  const {user, logOutContext, updateUserContext, signedIn} = useUser();
  const [followers, setFollowers] = React.useState<IUser[]>([]);
  const [followings, setFollowings] = React.useState<IUser[]>([]);
  const navigate = useNavigate();
  const [email, setEmail] = React.useState("");
  const [fullName, setFullname] = React.useState("");
  // const [bio, setBio] = React.useState("");
  // const [organization, setOrganization] = React.useState("");

  const handleEditAccount = async () => {
    alert("Updating account");
    if (signedIn) {
      if (email === "" || fullName === "") {
        alert("Please fill out all fields");
        return;
      }

      try {
        await updateUserContext({
          email: email,
          fullName: fullName,
        });
        alert("Account updated");
      } catch (error) {
        alert("Error logging in");
      }
    }
  };

  /**
   * Handles the log out button
   * Sends
   */
  const handleLogOutButton = async () => {
    try {
      await logOutContext();
      navigate("/home");
    } catch (error) {
      alert("Error logging out");
    }
  };

  const handleFollowUser = async () => {
    if (signedIn) {
      if (user && accountId) {
        if (accountId === user._id) {
          alert("Cannot follow yourself");
          return;
        }
        try {
          await followUser(user._id, accountId);
          setFollowers([...followers, user]);
        } catch (error) {
          alert("Error following user");
        }
      }
    } else {
      alert("Please sign in to follow users");
    }
  };

  const handleUnFollowUser = async () => {
    if (signedIn) {
      if (user && accountId) {
        if (accountId === user._id) {
          alert("Cannot unfollow yourself");
          return;
        }
        try {
          await unfollowUser(user._id, accountId);
          setFollowers(
            followers.filter((follower) => follower._id !== user._id)
          );
        } catch (error) {
          alert("Error unfollowing user");
        }
      }
    } else {
      alert("Please sign in to unfollow users");
    }
  };

  React.useEffect(() => {
    const fetchData = async () => {
      if (accountId) {
        try {
          const userResponse = await getUserById(accountId);
          setEmail(userResponse.email);
          setFullname(userResponse.fullName);
          const userFollowers = await getUserFollowers(accountId);
          setFollowers(userFollowers);
          const userFollowings = await getUserFollowees(accountId);
          setFollowings(userFollowings);

          // setBio(userResponse.bio);
          // setOrganization(userResponse.organization);
        } catch (error) {
          alert("There is no user with this id");
        }
      }
    };
    fetchData();
  }, [accountId, signedIn]);

  return (
    <>
      {signedIn && user && user._id === accountId && (
        <div className='page pt-3'>
          <h2>You</h2>
          <div className='w-25 text-start border account-section'>
            <label htmlFor='emailSignup' className='mb-2'>
              Email
            </label>

            <input
              type='email'
              id='emailSignup'
              name='emailSignup'
              className='form-control'
              value={email}
              onChange={(event) => setEmail(event.target.value)}
            />
            <br />
            <label htmlFor='Full Name' className='mb-2'>
              Full Name
            </label>

            <input
              type='text'
              id='Full Name'
              name='Full Name'
              className='form-control'
              value={fullName}
              onChange={(event) => setFullname(event.target.value)}
            />
            <br />
            <div className='d-flex flex-row'>
              <button
                className='btn btn-outline-success me-3'
                onClick={async () => await handleEditAccount()}
              >
                Save Changes
              </button>
              <button
                className='btn btn-outline-danger'
                onClick={async () => await handleLogOutButton()}
              >
                Log Out
              </button>
            </div>
          </div>
        </div>
      )}

      {(!signedIn || (user && user._id !== accountId)) && (
        <div className='page pt-3'>
          <h2>
            {fullName}{" "}
            {(!user ||
              (user &&
                user.followings &&
                accountId !== undefined &&
                !user.followings.includes(accountId))) && (
              <button
                className='btn btn-outline-dark'
                onClick={async () => handleFollowUser()}
              >
                Follow +
              </button>
            )}
            {user &&
              user.followings &&
              accountId !== undefined &&
              user.followings.includes(accountId) && (
                <button
                  className='btn btn-outline-dark'
                  onClick={async () => handleUnFollowUser()}
                >
                  Unfollow -
                </button>
              )}
          </h2>
          <div className='d-flex flex-row'>
            <div>
              <div className='border account-section'>
                <label htmlFor='Full Name' className='mb-2'>
                  Full Name
                </label>
                <div>{fullName}</div>
                <br />
              </div>
            </div>

            <div className='follower-section border'>
              <FollowerTable followers={followers} />
            </div>
            <div className='following-section border'>
              <FollowingTable followings={followings} />
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default Account;
