import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./Pages/Home";
import { AuthContextProvider } from "./Context/AuthContext";
import MobileLogin from "./Pages/Mobile_Login";
import VerifyScreen from "./Pages/Verify_screen";
import ReferAFriend from "./Pages/Refer_a_friend";
import "../src/Fonts/Gellix-Regular/Gellix-Regular.ttf";
import "../src/Fonts/Gellix-Regular/Gellix-Regular.woff";
import "../src/Fonts/Gellix-Regular/Gellix-Regular.woff2";
import PrivacyPolicy from "./Pages/Privacy_policy";
import TermConditions from "./Pages/Term_and_Conditions";

function App() {
  return (
    <BrowserRouter>
      <AuthContextProvider>
        <Routes>
          <Route path="/" index element={<Home />} />
          <Route path="/login/mobile" element={<MobileLogin />} />
          <Route
            path="/login/mobile/verify_screen"
            element={<VerifyScreen />}
          />
          <Route path="/refer_a_friend" element={<ReferAFriend />} />

          <Route path='/privacy_policy' element={<PrivacyPolicy/>}/> 
          <Route path='/term_use' element={<TermConditions/>}/>
        </Routes>
      </AuthContextProvider>
    </BrowserRouter>
  );
}

export default App;
