import Feed from './Feed';
import Profile from './Profile';
import Notifications from './Notifications';
import Friends from './Friends';
import Activity from './Activity';
import Directory from './Directory';
import styles from '../styles/AllSections.module.css'; // Import the CSS module

function AllSections() {
  return (
    <div className={styles.allSections}>
      <div className={styles.leftColumn}>
        <Feed />
      </div>
      <div className={styles.rightColumn}>
        <div className={styles.sectionContainer}>
          <Profile />
        </div>
        <div className={styles.sectionContainer}>
          <Notifications />
        </div>
        <div className={styles.sectionContainer}>
          <Directory />
        </div>
        <div className={styles.sectionContainer}>
          <Friends />
        </div>
        <div className={styles.sectionContainer}>
          <Activity />
        </div>
      </div>
    </div>
  );
}

export default AllSections;
