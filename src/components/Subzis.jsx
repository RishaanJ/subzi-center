import React, { useEffect, useState } from "react";
import { useParams } from 'react-router-dom';
import { auth, db } from "./firebase";
import { arrayUnion, doc, getDoc, updateDoc } from "firebase/firestore";
import '../components-styling/Subzis.css';
import { ToastContainer, toast } from 'react-toastify';
import myImage from '../assets/text.png';
const Subzis = () => {
  const { subziId } = useParams();
  const [userDetails, setUserDetails] = useState(null);
  const [image, setImage] = useState(null);
  const [title, setTitle] = useState(null);
  const [avg, setAvg] = useState(null);
  const [review_s, setReview_s] = useState([]);
  const [review_i, setReview_i] = useState([]);
  const [int, setInt] = useState(5); // Initialize with 5
  const [string, setString] = useState("");

  const average = array => array.length ? array.reduce((a, b) => a + b) / array.length : 0;
  const starNotation = number => {
    let fill = "★";
    let unfill = "☆";
    let unfillStars = 5 - number;
    return fill.repeat(number) + unfill.repeat(unfillStars);
  };

  const fetchUserData = async () => {
    try {
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
    } catch (error) {
      console.error("Error fetching user data:", error);
    }
  };

  const findSubzi = async () => {
    try {
      if (subziId) {
        const docRef = doc(db, "Subzi", subziId);
        const getSub = await getDoc(docRef);
        if (getSub.exists()) {
          const subziData = getSub.data();
          setImage(subziData.Image || null);
          setTitle(subziData.Title || null);
          setReview_s(subziData.Strings || []);
          setReview_i(subziData.Ints || []);
          setAvg(Math.floor(average(subziData.Ints)));
        } else {
          console.log("Subzi not found");
          window.location.href = "/404"
        }
      }
    } catch (error) {
      console.error("Error fetching subzi data:", error);
    }
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    console.log("Rating:", int);
    console.log("Review:", string);
    const currentDoc = await getDoc(doc(db, "Subzi", subziId));
    const currentData = currentDoc.data();
    const updatedInts = [...(currentData.Ints || []), int];
    try {
      await updateDoc(doc(db, "Subzi", subziId), {
        Strings: arrayUnion(string),
        Ints: updatedInts,
      });
      toast.success("You have left a review!", {
        position: "top-center",
      });

      setInt(5);
      setString("");
      window.location.reload();

    } catch (error) {
      toast.error(error, { position: "top-center" });
    }
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

  useEffect(() => {
    fetchUserData();
    findSubzi();
    updateRating(5); // Fetch the subzi data when the component mounts
  }, [subziId]); // Depend on subziId to re-fetch if it changes

  // Function to update rating
  const updateRating = (n) => {
    setInt(n);
    const stars = document.getElementsByClassName("star");
    if (stars.length === 5) { // Ensure that there are 5 star elements
      for (let i = 0; i < 5; i++) {
        stars[i].className = "star " + (i < n ? "selected" : ""); // Add 'selected' class to filled stars
        stars[i].innerText = i < n ? '★' : '☆'; // Change star character based on rating
      }
      document.getElementById("output").innerText = "Rating is: " + n + "/5";
    }
  };

  return (
    <div>
      {userDetails ? (
        <div>
            <div className="flexbox-top">
                <img src={myImage} onClick={() => window.location.href = "/profile"}className="logo"/>
                <div className="flexbox-column">
                    <h3>Hey, {userDetails.username}!</h3>
                    <button className="btn btn-primary" onClick={handleLogout}>
                    Logout</button>
                </div>
            </div>
          <div className="Subzi-Container-Info">
            <div className="Subzi-Info">
              {image && <img src={image} alt={title} />}
              {title && <h2>{title}</h2>}
              <h3 className="stars">{starNotation(avg)}</h3>
            </div>
            <div className="leaveAReview">
              <h1>Leave a review!</h1>
              <form onSubmit={handleFormSubmit} className="reviw-form">
                <label>Star rating</label>
                <div className="card">
                  <br />
                  <span onClick={() => updateRating(1)} className="star">★</span>
                  <span onClick={() => updateRating(2)} className="star">★</span>
                  <span onClick={() => updateRating(3)} className="star">★</span>
                  <span onClick={() => updateRating(4)} className="star">★</span>
                  <span onClick={() => updateRating(5)} className="star">★</span>
                  <h3 id="output">Rating is: 5/5</h3> {/* Initialize with 5 */}
                </div>
                <label>Review</label>
                <input type="text" value={string} onChange={(e) => setString(e.target.value)} />
                <button className="pushable" type="submit"><span className="front">Submit</span></button>
              </form>
            </div>
          </div>
          <div className="Reviews">
            <h1 className="reviewsectiontitle">Reviews</h1>
            {review_s.slice().reverse().map((item, index) => (
              <h1 key={index} className="review">{item}</h1>
            ))}
          </div>
          <ToastContainer />
        </div>
      ) : (
        <div>
          <h1>You aren't logged in.</h1>
        </div>
      )}
    </div>
  );
};

export default Subzis;
