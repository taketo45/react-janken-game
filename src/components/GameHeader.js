





import React from 'react'
import styles from './JankenGame.module.css';
import headerStyles from './HeaderStyle.module.css';
import { useAtom } from 'jotai';
import { userStatusAtom } from './userStatusAtom';


function GameHeader({title, status}) {
  const [userStatus] = useAtom(userStatusAtom);

  return (
    <>
      <header className={headerStyles.header}>
        <h1 className={styles.title}>{title}</h1>
        <p className={styles.status}>勝ち数: {userStatus.totalWinCount} メダル数： {userStatus.medal}</p>
      </header>
    </>
  );
}

export default GameHeader