import React, { useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import Error from "../Components/ErrorMessage/Error";
import img from "../Images/refer_a_friend_img_x.png";
import { Button } from "@mui/material";
import { UserContext } from "../Context/AuthContext";
const ReferAFriend = () => {
  // const [code, setCode] = useState();
  const [error, setError] = useState();
  const codeRef = useRef();
  const { userId, uid } = UserContext();
  const navigation = useNavigate();
  const referralCodeMatch = async () => {
    const response = await fetch("https://cuddiapi.com/v1/user/createReferee", {
      headers: {
        "Access-Control-Allow-Origin": "*",
        "Content-Type": "application/json",

        Authentication: "Bearer" + userId,
      },
    });

    const data = await response.json();

    console.log(data);
    const referCodes = [];
    for (const key in data) {
      // console.log(key)
      // console.log(data[key].referCode)
      // console.log(data[key].referCode !== codeRef.current.value)
      referCodes.push(data[key].referCode);
    }

    if (referCodes.includes(codeRef.current.value)) {
      fetch("https://cuddiapi.com/v1/user/createReferee", {
        method: "POST",
        body: JSON.stringify({ userId: uid, referCode: codeRef.current.value }),
        headers: {
          "Access-Control-Allow-Origin": "*",
          "Content-Type": "application/json",
          Authentication: "Bearer" + userId,
        },
      })
        .then(() => {
          navigation("/");
        })
        .catch((err) => {
          setError(err.message);
        });
    } else {
      setError("Please enter correct referal code.");
    }
  };

  return (
    <>
      <div
        className="center"
        style={{ marginLeft: "10rem", marginTop: "5rem", marginRight: "10rem" }}
      >
        <div
          className="imgDiv"
          style={{ marginLeft: "0rem", marginTop: "10rem",display:"inline-block" }}
        >
          <div className="verifyImage" style={{ width: "950px" }}>
            <img width="100%" src={img} alt="" />
          </div>

          <div
            style={{ width: "1000px", textAlign: "left", marginTop: "2rem" }}
          >
            <span className="verifyText" style={{ fontSize: "25px" }}>
              To belong to the Cuddi community, a friend must invite you.Please
              provide your referral code below. Once registered, you may refer a
              friend with your code.
            </span>
            <br />
            <span className="verifyText" style={{ fontSize: "25px" }}>
              Make our community strong and share your referral code
              responsibly.
            </span>
          </div>
        </div>

        <div className="divBox" style={{ marginTop: "10rem",display:"inline-block" }}>
          <div className="inputContainer">
            <input
              placeholder="Enter referral code (ex. 4B1D9)."
              className="inputRefer"
              type="text"
              ref={codeRef}
              // onChange={(e) => setCode(e.target.value)}
            />
          </div>

          <Button className="btnLogin" onClick={() => referralCodeMatch()}>
            Continue
          </Button>
        </div>
      </div>
      {error && <Error />}
    </>
  );
};

export default ReferAFriend;
