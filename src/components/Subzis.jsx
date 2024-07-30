import React, { useEffect, useState } from "react";
import { useParams } from 'react-router-dom';
import { auth, db } from "./firebase";
import { arrayUnion, doc, getDoc, updateDoc } from "firebase/firestore";
import '../components-styling/Subzis.css';
import 'react-toastify/dist/ReactToastify.css';

const Subzis = () => {
  const { subziId } = useParams();
  const [userDetails, setUserDetails] = useState(null);
  const [image, setImage] = useState(null);
  const [title, setTitle] = useState(null);
  const [avg, setAvg] = useState(null);
  const [review_s, setReview_s] = useState([]);
  const [review_i, setReview_i] = useState([]);
  const [int, setInt] = useState("");
  const [string, setString] = useState("");

  const average = array => array.reduce((a, b) => a + b) / array.length;

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
    setString(int)
    setInt(string)

    try{
        await updateDoc(doc(db, "Subzi", subziId), {
            Strings: arrayUnion(string),
            Ints: arrayUnion(int),
        });
        toast.success("You have left a review!", {
            position: "top-center",
        });

        setInt("");
        setString("");

        findSubzi()
    } catch (eror){
        toast.error(eror, {position: "top-center",});
    }


  };

  useEffect(() => {
    fetchUserData();
    findSubzi(); // Fetch the subzi data when the component mounts
  }, [subziId]); // Depend on subziId to re-fetch if it changes

  return (
    <div>
      {userDetails ? (
        <div>
          <div className="Subzi-Container-Info">
            <div className="Subzi-Info">
              {image && <img src={image} alt={title} />}
              {title && <h2>{title}</h2>}
              <h3 className="stars">{starNotation(avg)}</h3>
            </div>
            <div className="leaveAReview">
              <h1>Leave a review!</h1>
              <form onSubmit={handleFormSubmit}>
                <label>Star rating</label>
                <input type="number" value={int} onChange={(e) => setInt(Number(e.target.value))} />
                <label>Review</label>
                <input type="text" value={string} onChange={(e) => setString(e.target.value)} />
                <button className="pushable" type="submit"><span className="front">Submit</span></button>
              </form>
            </div>
          </div>
          <div className="Reviews">
            {review_s.map((item, index) => (
              <h1 key={index} className="review">{item}</h1>
            ))}
          </div>
        </div>
      ) : (
        <div>
          <h1>YOu aint logged in cuh?</h1>
        </div>
      )}
    </div>
  );
};

export default Subzis;
