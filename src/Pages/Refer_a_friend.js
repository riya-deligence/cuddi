import React from 'react'
import img from "../Images/refer_a_friend_img_x.png"
import { Button } from '@mui/material'
const ReferAFriend = () => {
  return (
    <>
    <div
      className="center"
      style={{ marginLeft: "10rem", marginTop: "10rem" }}
    >
      <div className="imgDiv"   style={{ marginLeft: "0rem",marginTop:"5rem"}} >
        <div className="verifyImage" style={{width:"950px"}}>
          <img width="100%" src={img} alt="" />
        </div>
        
        <div style={{ width: "1000px" ,textAlign:"left",marginTop:"2rem"}}>
           
            <span className="verifyText" style={{fontSize:"25px"}}>
              To belong to the Cuddi community, a friend must invite you.Please provide your referral code below. Once registered, you may refer a friend with your code. 
            </span>
            <br/>
            <span className="verifyText" style={{fontSize:"25px"}}>
              Make our community strong and share your referral code responsibly.
            </span>
          </div>
      </div>

      <div className="divBox" style={{marginTop:"10rem"}}>
       
        <div className="inputContainer">
          <input
          placeholder='Enter referral code (ex. 4B1D9).'
            className="inputRefer"
            type="text"
            
          />
         
        
        </div>
        
      
        <Button className="btnLogin" >
          Continue
        </Button>
      </div>
    </div>
   
  </>
  )
}

export default ReferAFriend
