import React from "react";
import styles from "./Header.module.css";

const Header = () => {
  return (
    <div>
      <div className={styles.wrapper}>
        <span className={styles.logo}>Logo</span>
        <div className={styles.wrapper_second}>
          <md-filled-button>Feedback</md-filled-button>
          <img src="/bell.png" />
          <img src="/info.png" />
          <img src="/avatar.png" />
          <img src="/dropdown.png" />
        </div>
      </div>
    </div>
  );
};

export default Header;
