import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { logout } from "../features/auth/authSlice";
import { isTokenExpired } from "../utils/tokenExpiration";
import styles from "../styles/Home.module.css"; // ✅ Import CSS module
import { LocalCafe } from "@mui/icons-material"; // ✅ Import Coffee icon
import logo from "../assets/React-icon.svg.png"; // ✅ Import React Logo
import logo2 from "../assets/redux.logo.png"; // ✅ Import Redux Logo

function Home() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const token = useSelector((state) => state.auth.token);

  useEffect(() => {
    if (token) {
      if (isTokenExpired(token)) {
        dispatch(logout()); // ✅ Invalidate token if expired
      } else {
        navigate("/dashboard"); // ✅ Redirect authenticated users
      }
    }
  }, [token, dispatch, navigate]);

  return (
    <div className={styles.home}>
      {/* ✅ Text Section */}
      <h1 className={styles.anim1}>Hello.</h1>
      <h1 className={styles.anim2}>Welcome to this capstone project.</h1>
      <h1 className={styles.anim3}>A social media site built on React Redux.</h1>
      <h3 className={styles.anim4}>
        It is not social, and there is no media. Discuss. 
        <LocalCafe fontSize="small" className={styles.icon} /> {/* ✅ Coffee Icon */}
      </h3>

      {/* ✅ Horizontal Bar */}
      <div className={styles.horizontalBar}></div>

      {/* ✅ Logos Section */}
      <div className={styles.logoContainer}>
        <img src={logo} alt="React Logo" className={styles.logoReact} />
        <img src={logo2} alt="Redux Logo" className={styles.logoRedux} />
      </div>
    </div>
  );
}

export default Home;
