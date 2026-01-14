import React, { useState, useEffect } from "react";
import LoginScreen from "./screens/LoginScreen";
import { BrowserRouter as Router } from 'react-router-dom';
import { Routes, Route } from 'react-router-dom';

import "./app.scss";

const Desktop = () => {
  return (
      <div className="w-screen h-full min-h-screen dark:bg-gray-900">
          <Routes>
            <Route exact path="/login" element={<LoginScreen />} />
          </Routes>
      </div>
  );
};

export default Desktop;