import React from "react";
import styles from "./Footer.module.css";

const footer = {
  name: "RecipeSearcher",
  author: "Marcel Ćmachowski",
  github: "https://github.com/mcmachowski/RecipeSearcher",
  LinkedIn: "https://www.linkedin.com/in/marcel-%C4%87machowski-7b3954233/",
};

const Footer = () => {
  const fullYear = new Date().getFullYear();
  return (
    <footer className={styles.footer}>
      <ul className={`wrapper ${styles.list}`}>
        <li className={styles.element}>
          {footer.name} {fullYear}
        </li>
        <li className={styles.element}>{footer.author}</li>
        <li className={`${styles.element} ${styles.animation}`}>
          <a href={footer.github} rel="noopener noreferrer" target="_blank">
            GitHub
          </a>
        </li>
        <li className={`${styles.element} ${styles.animation}`}>
          <a href={footer.LinkedIn} rel="noopener noreferrer" target="_blank">
            LinkedIn
          </a>
        </li>
      </ul>
    </footer>
  );
};

export default Footer;
