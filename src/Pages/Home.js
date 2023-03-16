import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./pages.css";
import { signInWithRedirect, FacebookAuthProvider } from "firebase/auth";
import { Auth } from "../firebase";
import LocalPhoneIcon from "@mui/icons-material/LocalPhone";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Footer from "../Components/Footer/Footer";
import logo from "../Images/logo.png";
import Error from "../Components/ErrorMessage/Error";
import Checkbox from "@mui/material/Checkbox";
import Button from "@mui/material/Button";

import { FacebookLoginButton } from "react-social-login-buttons";

import { grey, red } from "@mui/material/colors";

function Home() {
  const [isChecked, setIsChecked] = useState(false);
  const [hasError, setHasError] = useState(false);
  const navigation = useNavigate();
  const handleCheckboxChange = (e) => {
    setIsChecked(e.target.checked);
  };

  const facebookButtonClick = (response) => {
    if (!isChecked) {
     
      setHasError(true);
      //to hide the error div after few seconds.
      setTimeout(() => {
        setHasError(false);
      }, 5000);
    } else {
      const provider = new FacebookAuthProvider();
      signInWithRedirect(Auth, provider)
        .then((res) => {
          navigation("/refer_a_friend")
          console.log(res);
        })
        .catch((err) => {
          console.log(err.message);
        });
    }
  };

  const handleButtonClick = () => {
    if (!isChecked) {
      setHasError(true);
      //to hide the error div after few seconds.

      setTimeout(() => {
        setHasError(false);
      }, 5000);
     
    } else {
      navigation("/login/mobile");
    }
  };

  



  return (
    <>
      <div className="center">
        <div className="intro">
          <img
            style={{
              width: "190px",
            }}
            src={logo}
            alt=""
          />

          <p>Cuddi helps you connect and share with the people in your life.</p>
        </div>
        <div className="divBox">
          <Button className="btn" onClick={() => facebookButtonClick()}>
            <FacebookLoginButton className="btn">
              <span className="text">Sign in with Facebook</span>
            </FacebookLoginButton>
          </Button>

          <Button
            className="btn btn_mobile"
            onClick={() => handleButtonClick()}
          >
            <LocalPhoneIcon fontSize="large" />
            Sign in with mobile
          </Button>

          <label className="checkbox">
            <Checkbox
              onClick={handleCheckboxChange}
              sx={{
                "& .MuiSvgIcon-root": { fontSize: 28 },
                color: grey[800],
                "&.Mui-checked": {
                  color: red[600],
                },
              }}
            />
            <div>
              I have read and accept the
              <Link
                to="/term_use"
                style={{ textDecoration: "none", color: "black" }}
              >
                <span className="checkbox_title"> Term and Conditions</span>
              </Link>
              <span> and </span>
              <Link
                to="/privacy_policy"
                style={{ textDecoration: "none", color: "black" }}
              >
                <span className="checkbox_title">Privacy Policy.</span>
              </Link>
            </div>
          </label>
        </div>
      </div>
    
      
      {hasError && (
        <Error message="Please accept our Terms & Conditions and Privacy Policy." />
      )}
      <Footer />
    </>
  );
}

export default Home;
