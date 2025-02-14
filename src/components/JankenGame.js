// JankenGame.jsx
import React, { useState } from 'react';
import styles from './JankenGame.module.css';
import GameHeader from './GameHeader';
import JankenMain from './JankenMain';
// import { atom, useAtom } from 'jotai';
// import { userStatusAtom } from './userStatusAtom';



const JankenGame = () => {

  // const [userStatus, setUserStatus] = useAtom(userStatusAtom);

  return (
    <div className={styles.container}>
      <GameHeader title={"じゃんけん"} />

      <JankenMain />
    </div>
  );
};

export default JankenGame;