import React from 'react';
import { Routes, BrowserRouter, Route } from "react-router";
import NavBar from './components/NavBar';
import HomePage from './components/HomePage';
import Error404 from './components/Error404';
import SearchPage from './components/searchPage';
import ExplorePage from './components/ExplorePage';
import AboutPage from './components/AboutPage';
import ContactPage from './components/ContactPage';
import SignupPage from './components/SignupPage';
import LoginPage from './components/LoginPage';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<NavBar />}>
        <Route index element={<HomePage />}/>
        <Route path="Search" element={<SearchPage />}/>
        <Route path="Explore" element={<ExplorePage />}/>
        <Route path="About" element={<AboutPage />}/>
        <Route path="Contact" element={<ContactPage />}/>
        <Route path="Login" element={<LoginPage />}/>
        <Route path="SignUp" element={<SignupPage />}/>
        <Route path='*' element={<Error404/>}/>
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
