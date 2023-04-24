import React from "react";
import "./Info.css";

const UserForm = () => {
 

  return (
   <div className="center">
    <form>
      <h2>Create User</h2>
      <div>
        <h4>Choose a username</h4>
        <input></input>
      </div>
      <div>
        <h4>My birthday is </h4>
        <input></input>
      </div>
      <div>
        <h4>I am a </h4>
        <button>MAN</button>
        <button>WOMAN</button>
        <button>OTHER</button>

      </div>
      <div>
        <h4>Show me </h4>
        <button>MEN</button>
        <button>WOMEN</button>
        <button>EVERYONE</button>
      </div>

      <button>Continue</button>
    </form>
   </div>
  );
};

export default UserForm;