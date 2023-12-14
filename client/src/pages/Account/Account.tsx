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
import {set} from "mongoose";
import {IAnalystArticle} from "../../interfaces/analystArticle";
import {getAnalystArticlesByAuthorId} from "../../services/AnalystArticlesService";
import AnalystArticleCard from "../../components/analystArticleCard/analystArticleCard";

function Account() {
  const {accountId} = useParams();
  const {user, logOutContext, updateUserContext, signedIn} = useUser();
  const [followers, setFollowers] = React.useState<IUser[]>([]);
  const [followings, setFollowings] = React.useState<IUser[]>([]);
  const navigate = useNavigate();
  const [email, setEmail] = React.useState("");
  const [fullName, setFullname] = React.useState("");
  const [bio, setBio] = React.useState("");
  const [organization, setOrganization] = React.useState("");
  const [role, setRole] = React.useState("");
  const [articles, setArticles] = React.useState<IAnalystArticle[]>([]);

  const handleEditAccount = async () => {
    alert("Updating account");
    if (signedIn) {
      if (email === "" || fullName === "") {
        alert("Please fill out all fields");
        return;
      }

      try {
        if (role === "USER") {
          await updateUserContext({
            email: email,
            fullName: fullName,
            bio: bio,
          });
        }
        if (role === "ANALYST") {
          await updateUserContext({
            email: email,
            fullName: fullName,
            organization: organization,
          });
        }
        alert("Account updated");
      } catch (error) {
        alert("Error changing account");
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
          setBio(userResponse.bio || "");
          setOrganization(userResponse.organization || "");
          const userFollowers = await getUserFollowers(accountId);
          setFollowers(userFollowers);
          const userFollowings = await getUserFollowees(accountId);
          setFollowings(userFollowings);
          setRole(userResponse.role);
          if (userResponse.role === "ANALYST") {
            const articleResponse =
              await getAnalystArticlesByAuthorId(accountId);
            setArticles(articleResponse);
          }

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
          <div className='d-flex flex-row'>
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
              {role === "USER" && (
                <>
                  <label htmlFor='Bio' className='mb-2'>
                    Bio
                  </label>

                  <input
                    type='text'
                    id='Bio'
                    name='Bio'
                    className='form-control'
                    value={bio}
                    onChange={(event) => setBio(event.target.value)}
                  />
                  <br />
                </>
              )}
              {role === "ANALYST" && (
                <>
                  <label htmlFor='Organization' className='mb-2'>
                    Organization
                  </label>
                  <input
                    type='text'
                    id='Organization'
                    name='Organization'
                    className='form-control'
                    value={organization}
                    onChange={(event) => setOrganization(event.target.value)}
                  />
                  <br />
                </>
              )}
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

            <div className='follower-section border'>
              <FollowerTable followers={followers} />
            </div>
            <div className='following-section border'>
              <FollowingTable followings={followings} />
            </div>
          </div>
          {role === "ANALYST" && (
            <div className='mt-3'>
              <div className='d-flex flex-row align-items-center'>
                <h2>Articles</h2>
                <button
                  className='btn btn-outline-dark ms-2 h-auto'
                  onClick={() => navigate("/analyst-article/new")}
                >
                  Add Article
                </button>
                {/* <h2 className='align-items-center'>
                Your Articles{" "}
                <button className='btn btn-outline-dark'>Add Article</button>
              </h2> */}
              </div>
              <div className='d-flex flex-row flex-wrap mt-3'>
                {articles.map((article, index) => (
                  <div key={index}>
                    {" "}
                    <AnalystArticleCard article={article} />
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      )}

      {(!signedIn || (user && user._id !== accountId)) && (
        <div className='page pt-3'>
          <h2>
            {fullName + " (" + role + ") "}
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
                {role === "USER" && (
                  <>
                    {" "}
                    <label htmlFor='Full Name' className='mb-2'>
                      Bio
                    </label>
                    <div>{bio}</div>{" "}
                  </>
                )}
                {role === "ANALYST" && (
                  <>
                    {" "}
                    <label htmlFor='Organization' className='mb-2'>
                      Organization
                    </label>
                    <div>{organization}</div>{" "}
                  </>
                )}
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
          {role === "ANALYST" && (
            <div className='mt-3'>
              <h2>Your Articles</h2>
              {articles.map((article, index) => (
                <div key={index}>
                  {" "}
                  <AnalystArticleCard article={article} />
                </div>
              ))}
            </div>
          )}
        </div>
      )}
    </>
  );
}

export default Account;
