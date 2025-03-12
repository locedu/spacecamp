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
      {/* Feed and Profile on the same row */}
      <div className={styles.row}>
        <div className={styles.sectionContainer}>
          <Feed />
        </div>
        <div className={styles.sectionContainer}>
          <Profile />
        </div>
      </div>

      {/* Notifications and Activity on the same row */}
      <div className={styles.row}>
        <div className={styles.sectionContainer}>
          <Notifications />
        </div>
        <div className={styles.sectionContainer}>
          <Activity />
        </div>
      </div>

      {/* Directory and Friends on the same row */}
      <div className={styles.row}>
        <div className={styles.sectionContainer}>
          <Directory />
        </div>
        <div className={styles.sectionContainer}>
          <Friends />
        </div>
      </div>

    </div>
  );
}

export default AllSections;
