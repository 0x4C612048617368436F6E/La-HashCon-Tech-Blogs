import React from 'react';
import { Routes, BrowserRouter, Route } from "react-router";
import NavBar from './components/NavBar.tsx';
import HomePage from './components/HomePage.tsx';
import Error404 from './components/Error404.tsx';
import SearchPage from './components/searchPage.tsx';
import ExplorePage from './components/ExplorePage.tsx';
import AboutPage from './components/AboutPage.tsx';
import ContactPage from './components/ContactPage.tsx';
import SignupPage from './components/SignupPage.tsx';
import LoginPage from './components/LoginPage.tsx';

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
