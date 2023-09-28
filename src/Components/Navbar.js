import React, { useState, useEffect } from "react";
import { Link, Navigate, useNavigate } from "react-router-dom";
import "./Navbar.css";
import cartlogo from "../Components/assets/cartlogo.png";
import profilelogo from "../Components/assets/profilelogo.png";
import applogo from "../Components/assets/Applogo1.png";
import { auth, db } from "../FirebaseConfigs/firebaseConfig";
import { collection, getDocs, query, where } from "firebase/firestore";

const Navbar = () => {
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

  const navigate = useNavigate();

  const handleLogout = () => {
    auth.signOut().then(() => {
      navigate("/login");
    });
  };
  return (
    <div className="navbar">
      <div className="LeftContainer">
        <img src={applogo} />
      </div>
      <div className="RightContainer">
        {!loggeduser && (
          <nav>
            <Link to="/">
              <button>Home</button>
            </Link>
            <Link to="/signup">
              <button>Register</button>
            </Link>
            <Link to="/login">
              {" "}
              <button>Login</button>{" "}
            </Link>
            <div className="'cart-btn">
              <img
                className="cartimg"
                src="https://www.freeiconspng.com/uploads/shopping-cart-icon-5.png"
                width="50px"
                height="50px"
                alt="shopping cart icon"
              />
              <span className="cart-icon-css">0</span>
            </div>
            <Link to="/userprofile">
              <img src={profilelogo} className="profile-icon" />
            </Link>
          </nav>
        )}

        {loggeduser && (
          <nav>
            <Link to="/">
              <button>Home</button>
            </Link>
            <div className="'cart-btn">
              <img src={cartlogo} alt="no img" />
              <span className="cart-icon-css">{loggeduser[0].cart}</span>
            </div>
            <Link to="/userprofile">
              <img src={profilelogo} className="profile-icon" />
            </Link>
            <button className="logout-btn" onClick={handleLogout}>
              Logout
            </button>
          </nav>
        )}
      </div>
    </div>
  );
};

export default Navbar;
