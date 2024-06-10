import React from "react";
import { Routes, Route } from "react-router-native";
import Call from "./pages/Call";
import TestVideo from "./pages/TestVideo";
import PrivateRoute from "../../components/containers/PrivateRoute";

const Videocall: React.FC = () => {
  return (
    <Routes>
      <Route path="/" element={<TestVideo />} />
      {/* <Route path="/Call" element={<Call />} /> */}
      <Route path="/:roomId" element={<PrivateRoute component={Call} />} />
    </Routes>
  );
};

export default Videocall;
