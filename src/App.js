import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./Pages/Home";
import { AuthContextProvider } from "./Context/AuthContext";
import MobileLogin from "./Pages/MobileLogin";
import VerifyScreen from "./Pages/Verify_screen";
import "../src/Fonts/Gellix-Regular/Gellix-Regular.ttf";
import "../src/Fonts/Gellix-Regular/Gellix-Regular.woff";
import "../src/Fonts/Gellix-Regular/Gellix-Regular.woff2";
// import PrivacyPolicy from './components/PrivacyPolicy';
// import TermUse from './components/TermUse';

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
          {/* <Route path='/privacy/policy' element={<PrivacyPolicy/>}/> */}
          {/* <Route path='/term/use' element={<TermUse/>}/> */}
        </Routes>
      </AuthContextProvider>
    </BrowserRouter>
  );
}

export default App;
