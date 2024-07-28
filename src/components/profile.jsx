import React, { useEffect, useState } from "react";
import { auth, db } from "./firebase";
import { doc, getDoc } from "firebase/firestore";
import myImage from '../assets/text.png';

function Profile() {
  const [userDetails, setUserDetails] = useState(null);
  const fetchUserData = async () => {
    auth.onAuthStateChanged(async (user) => {
      console.log(user);

      const docRef = doc(db, "Users", user.uid);
      const docSnap = await getDoc(docRef);
      if (docSnap.exists()) {
        setUserDetails(docSnap.data());
        console.log(docSnap.data());
      } else {
        console.log("User is not logged in");
      }
    });
  };
  useEffect(() => {
    fetchUserData();
  }, []);

  async function handleLogout() {
    try {
      await auth.signOut();
      window.location.href = "/login";
      console.log("User logged out successfully!");
    } catch (error) {
      console.error("Error logging out:", error.message);
    }
  }
  return (
    <div>
      {userDetails ? (
        <>
          <div className="flexbox-top">
            <img src={myImage} className="logo"/>
            <div className="flexbox-column">
                <h3>Hey, {userDetails.username}!</h3>
                <button className="btn btn-primary" onClick={handleLogout}>
                Logout</button>
            </div>
            
          </div>
          <div className="subzi-big-container">
            <div className="subzi-of-the-day">
                <img className="subzi-otd"/>
                <h1>Subzi of the Day</h1>
            </div>
            <div className="subzi-small-container">

                <div className="subzi">
                    <img/>
                    <h1>Subzi Name</h1>
                </div>
                <div className="subzi">
                    <img src="https://www.vegrecipesofindia.com/wp-content/uploads/2014/09/patta-gobi-matar-recipe-1.jpg"/>
                    <h1>Patha Gobi</h1>
                </div>
                <div className="subzi">
                    <img/>
                    <h1>Subzi Name</h1>
                </div>
                <div className="subzi">
                    <img/>
                    <h1>Subzi Name</h1>
                </div>
            </div>
          </div>

        </>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
}
export default Profile;