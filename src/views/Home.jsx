// src/views/Home.jsx
import styles from "../styles/Home.module.css"; // ✅ Import CSS module
import { LocalCafe } from "@mui/icons-material"; // ✅ Import Coffee icon

function Home() {
    return (
      <div className={styles.home}>
        <h1 className={styles.anim1}>Hello.</h1> {/* ✅ Use class instead of ID */}
        <h1 className={styles.anim2}>Welcome to this capstone project.</h1>
        <h1 className={styles.anim3}>A social media site built on React Redux.</h1>
        <h3 className={styles.anim4}>
          It is not social, and there is no media. Discuss. 
          <LocalCafe fontSize="small" className={styles.icon} /> {/* ✅ Coffee Icon */}
        </h3>
      </div>
    );
}

export default Home;
