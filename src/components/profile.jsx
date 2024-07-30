import React, { useEffect, useState } from "react";
import { auth, db } from "./firebase";
import { doc, getDoc, collection, getDocs } from "firebase/firestore";
import Tile from "./Tile";
import myImage from '../assets/text.png';

function Profile() {
  const [userDetails, setUserDetails] = useState(null);
  const [subziItems, setSubziItems] = useState([]);

  const fetchUserData = async () => {
    auth.onAuthStateChanged(async (user) => {
      if (user) {
        const docRef = doc(db, "Users", user.uid);
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
          setUserDetails(docSnap.data());
        } else {
          console.log("User is not logged in");
        }
      }
    });
  };

  const fetchSubziItems = async () => {
    const subziCollection = collection(db, "Subzi");
    const subziSnapshot = await getDocs(subziCollection);
    const subziList = subziSnapshot.docs.map(doc => doc.data());
    setSubziItems(subziList);
  };

  useEffect(() => {
    fetchUserData();
    fetchSubziItems();
  }, []);

  const randomDegree = () => {
    const degree = Math.floor(Math.random() * 10) - 5;
    return {
      transform: `rotate(${degree}deg)`
    };
  };


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
                <img src="https://www.spiceupthecurry.com/wp-content/uploads/2020/11/achari-bhindi-2.jpg" className="subzi-otd"/>
                <h1>Subzi <br/> of <br/> the <br/> Day</h1>
            </div>
            <div className="subzi-small-container">
              {subziItems.map((item, index) => (
                <Tile s={randomDegree()} key={index} imageSrc={item.Image} name={item.Title} />
              ))}
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
