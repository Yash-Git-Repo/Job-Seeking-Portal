import "./App.css";
import { Routes, Route, useNavigate } from "react-router-dom";
import Home from "./components/home/Home";
import Jobs from "./components/job/Jobs";
import JobDetails from "./components/job/JobDetails";
import PostJobs from "./components/job/PostJobs";
import MyJobs from "./components/job/MyJobs";
import Application from "./components/application/Application";
import Login from "./pages/login/Login";
import Register from "./pages/register/Register";
import RequireUser from "./components/RequireUser";
import OnlyIfNotLoggedIn from "./components/OnlyIfNotLoggedIn";
import PageNotFound from "./components/pageNotFound/PageNotFound";
import Hero from "./components/hero/Hero";
import Navbar from "./components/navbar/Navbar";
import Footer from "./components/footer/Footer";
import { useContext, useEffect, useState } from "react";
import { UserContext } from "./context/userContext";
import { KEY_ACCESS_TOKEN, removeItem } from "./utils/localStorageManager";
import { axiosClient } from "./utils/axiosClient";
import ApplyForm from "./components/applyForm/ApplyForm";

function App() {
  const navigate = useNavigate();
  const { user } = useContext(UserContext);

  useEffect(() => {
    if (!user) {
      removeItem(KEY_ACCESS_TOKEN);
      navigate("/login");
    }
  }, [user]);

  return (
    <div className="App">
      {user && <Navbar />}
      <Routes>
        <Route element={<RequireUser />}>
          <Route path="/" element={<Home />} />
          <Route path="/getAllJobs" element={<Jobs/>} />
          <Route path="/job/:jobId" element={<JobDetails />} />
          <Route path="/createJob" element={<PostJobs />} />
          <Route path="/getJobPostedByOwner/:ownerId" element={<MyJobs />} />
          <Route path="/application" element={<Application />} />
          <Route path="/hero" element={<Hero />} />
          <Route path="/apply/:jobId" element={<ApplyForm />} />
        </Route>

        <Route element={<OnlyIfNotLoggedIn />}>
          <Route path="/login" element={<Login />} />
          <Route path="/signUp" element={<Register />} />
        </Route>
        <Route path="*" element={<PageNotFound />} />
      </Routes>
      {user && <Footer />}
    </div>
  );
}

export default App;
