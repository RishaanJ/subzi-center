import React, { useEffect, useState } from "react";
import { auth, db } from "./firebase";
import { doc, getDoc, setDoc } from "firebase/firestore";
import JSConfetti from 'js-confetti';
import './admin.css';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import myImage from '../assets/text.png'

function Admin() {
    const [userDetails, setUserDetails] = useState(null);
    const [isAdmin, setIsAdmin] = useState(null);
    const [subzi, setSubzi] = useState({ name: '', url: '', review_s: '', review_i: '' });
    const jsConfetti = new JSConfetti();

    const handleSubzi = async (e) => {
        e.preventDefault();
        const review_s_array = subzi.review_s.split(',');
        const review_i_array = subzi.review_i.split(',').map(Number);

        try {
            await setDoc(doc(db, "Subzi", `${subzi.name.toLowerCase().replace(/\s+/g, '')}`), {
                Title: subzi.name,
                Image: subzi.url,
                Strings: review_s_array,
                Ints: review_i_array,
            });
            toast.success("Subzi has been created!", {
                position: "top-center",
            });
            BanananaHammerPressed("🇮🇳");
        } catch (error) {
            console.log(error.message);
            toast.error(error.message, {
                position: "top-center",
            });
        }
    };

    const fetchUserData = async () => {
        auth.onAuthStateChanged(async (user) => {
            if (user) {
                const docRef = doc(db, "Users", user.uid);
                const docSnap = await getDoc(docRef);
                if (docSnap.exists()) {
                    const data = docSnap.data();
                    setUserDetails(data);
                    setIsAdmin(checkForAdmin(user.uid));
                } else {
                    console.log("No such document!");
                }
            } else {
                console.log("User is not logged in");
            }
        });
    };

    const checkForAdmin = (uid) => {
        if (uid === "cFMm2pGbTnenmfX1f7WF4doMLhT2") {
            console.log("Admin found");
            return true;
        }
        return false;
    };

    useEffect(() => {
        fetchUserData();
    }, []);

    const BanananaHammerPressed = (emoji) => {
        jsConfetti.addConfetti({
            confettiColors: ['#FFD700', '#FF6347', '#FF4500', '#FF1493'],
            emojis: [emoji],
            confettiRadius: 6,
            confettiNumber: 200,
            confettiVelocity: 7
        });
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setSubzi(prevSubzi => ({
            ...prevSubzi,
            [name]: value
        }));
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
            {userDetails && isAdmin ? (
                <>
                    <div className="flexbox-top">
                        <img src={myImage} className="logo"/>
                        <div className="flexbox-column">
                            <h3>Hey, {userDetails.username}!</h3>
                            <button className="btn btn-primary" onClick={handleLogout}>
                            Logout</button>
                        </div>
                    </div>
                    <canvas className="confetti"></canvas>
                    <section className="adminpanel-command-section">
                        <h2>Commands</h2>
                        <button id="ban-user" className="adminpanel-btn adminpanel-btn-3d" onClick={BanananaHammerPressed}>BanananaHammer</button>
                    </section>
                    <section className="adminpanel-add-sabzi-section">
                        <h2>Add Sabzi</h2>
                        <form id="adminpanel-add-sabzi-form" onSubmit={handleSubzi}>
                            <label htmlFor="name">Title:</label>
                            <input type="text" id="name" name="name" onChange={handleChange} required />
                            
                            <label htmlFor="url">Image URL:</label>
                            <input type="text" id="url" name="url" onChange={handleChange} required />
                            
                            <label htmlFor="review_i">Ints (comma separated):</label>
                            <input type="text" id="review_i" name="review_i" onChange={handleChange} />
                            
                            <label htmlFor="review_s">Strings (comma separated):</label>
                            <input type="text" id="review_s" name="review_s" onChange={handleChange} />
                            
                            <button type="submit" className="adminpanel-btn adminpanel-btn-3d">Add Sabzi</button>
                        </form>
                    </section>
                </>
            ) : (
                <h1>You ain't the admin, big boy</h1>
            )}
        </div>
    );
}

export default Admin;
