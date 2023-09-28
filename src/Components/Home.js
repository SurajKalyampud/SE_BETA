import React, { useState, useEffect } from "react";
import Navbar from "./Navbar.js";
import Products from "./Products.js";
import Banner from "./Banner.js";
import { auth, db } from "../FirebaseConfigs/firebaseConfig";
import { collection, getDocs, query, where } from "firebase/firestore";
const Home = () => {
  function GetCurrentUser() {
    const [user, setUser] = useState("");
    const usersCollectionRef = collection(db, "users");

    useEffect(() => {
      auth.onAuthStateChanged((userlogged) => {
        if (userlogged) {
          const getUsers = async () => {
            const q = query(
              collection(db, "users"),
              where("uid", "==", userlogged.uid)
            );
            console.log(q);
            const data = await getDocs(q);
            setUser(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
          };
          getUsers();
        } else {
          setUser(null);
        }
      });
    }, []);
    return user;
  }
  const loggeduser = GetCurrentUser();
  if (loggeduser) {
    console.log(loggeduser);
  }

  return (
    <div>
      <Navbar />
      <Banner />
      <h1>Home</h1>
      <Products />
      <p>{loggeduser ? loggeduser[0].email : "No Data loude!"}</p>
    </div>
  );
};

export default Home;
