import React from "react";
import ThoughtList from "../components/ThoughtList";
import ThoughtForm from "../components/ThoughtForm";
import FriendList from "../components/FriendList";

import charityLogo from "../assets/images/best_friends_utah.png";

import Auth from "../utils/auth";
import { useQuery } from "@apollo/client";
import { QUERY_THOUGHTS, QUERY_ME_BASIC } from "../utils/queries";

const Home = () => {
  const { loading, data } = useQuery(QUERY_THOUGHTS);
  const { data: userData } = useQuery(QUERY_ME_BASIC);
  const thoughts = data?.thoughts || [];

  const loggedIn = Auth.loggedIn();

  return (
    <main>
      <section>
        <div className="container">
          <div className="flex-row justify-space-between">
            {loggedIn && (
              <div className="col-12 mb-3">
                <ThoughtForm />
              </div>
            )}
            <div className={`col-12 mb-3 ${loggedIn && "col-lg-8"}`}>
              {loading ? (
                <div>Loading...</div>
              ) : (
                <ThoughtList
                  username={userData?.me.username}
                  thoughts={thoughts}
                  title="Look at these cute pets!"
                />
              )}
            </div>
            <div className="bottomBar">
              {loggedIn && userData ? (
                <div className="col-12 col-lg-3 mb-3">
                  <FriendList
                    username={userData.me.username}
                    friendCount={userData.me.friendCount}
                    friends={userData.me.friends}
                  />
                </div>
              ) : null}
              <div className="row justify-content-end">
                <div className="col-12 col-lg-3 mb-3">
                  <a
                    href="https://utah.bestfriends.org/get-involved/donate"
                    target="_blank"
                    rel="noreferrer"
                  >
                    <img src={charityLogo} alt="Best Friends in Utah" />
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
};

export default Home;
