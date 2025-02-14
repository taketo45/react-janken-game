// JankenGame.jsx
import React, { useState } from 'react';
import styles from './JankenGame.module.css';

const HANDS = {
  GU: 1,
  CHOKI: 2,
  PA: 3,
};

const MESSAGES = {
  EVEN: 'あいこ',
  WIN: 'かち',
  LOSE: 'まけ',
  BUY_MEDAL: "10円か100円を投入してください",
};

const JankenGame = () => {
  const [gameStatus, setGameStatus] = useState({
    winCount: 0,
    medal: 0,
    isGuChokiPaAble: false,
    isStartAble: true,
    isGaming: false,
  });
  
  const [judgment, setJudgment] = useState('');
  const [pcHand, setPcHand] = useState(null);
  
  const insertCoins = (amount) => {
    if (gameStatus.isGaming) return;
    setGameStatus(prev => ({
      ...prev,
      medal: prev.medal + amount
    }));
  };

  const startGame = () => {
    if (gameStatus.isGaming || gameStatus.medal <= 0) {
      if (gameStatus.medal <= 0) alert(MESSAGES.BUY_MEDAL);
      return;
    }

    setGameStatus(prev => ({
      ...prev,
      isGaming: true,
      isGuChokiPaAble: true,
      medal: prev.medal - 1
    }));
    setJudgment('');
    setPcHand('waiting');
  };

  const handleJanken = (hand) => {
    if (!gameStatus.isGuChokiPaAble) return;

    const pcHandValue = Math.ceil(Math.random() * 3);
    setPcHand(pcHandValue);

    const result = getGameResult(hand, pcHandValue);
    handleGameResult(result);
  };

  const getGameResult = (playerHand, pcHand) => {
    if (playerHand === pcHand) return 'EVEN';
    if (
      (playerHand === HANDS.GU && pcHand === HANDS.CHOKI) ||
      (playerHand === HANDS.CHOKI && pcHand === HANDS.PA) ||
      (playerHand === HANDS.PA && pcHand === HANDS.GU)
    ) {
      return 'WIN';
    }
    return 'LOSE';
  };

  const handleGameResult = (result) => {
    setJudgment(MESSAGES[result]);
    
    if (result === 'EVEN') {
      setTimeout(() => {
        setPcHand('waiting');
        setGameStatus(prev => ({
          ...prev,
          isGuChokiPaAble: true
        }));
      }, 1000);
      return;
    }

    if (result === 'WIN') {
      setGameStatus(prev => ({
        ...prev,
        winCount: prev.winCount + 1,
        medal: prev.medal + getWinMedals(prev.winCount + 1),
        isGuChokiPaAble: false,
        isGaming: false
      }));
    } else {
      setGameStatus(prev => ({
        ...prev,
        winCount: 0,
        isGuChokiPaAble: false,
        isGaming: false
      }));
    }
  };

  const getWinMedals = (winCount) => {
    const medals = [2, 4, 8, 16, 32];
    return medals[winCount - 1] || 0;
  };

  const renderHand = (hand) => {
    if (hand === 'waiting') {
      return "✊✌️✋";
    }
    const hands = {
      [HANDS.GU]: '✊',
      [HANDS.CHOKI]: '✌️',
      [HANDS.PA]: '✋'
    };
    return hands[hand] || '';
  };

  return (
    <div className={styles.container}>
      <header className={styles.header}>
        <h1 className={styles.title}>じゃんけん</h1>
      </header>

      <main className={styles.main}>
        <div className={styles.coinSection}>
          <div className={styles.buttonRow}>
            <button 
              onClick={() => insertCoins(1)} 
              className={styles.coinButton}
              disabled={gameStatus.isGaming}
            >
              10円投入
            </button>
            <button 
              onClick={() => insertCoins(10)}
              className={styles.coinButton}
              disabled={gameStatus.isGaming}
            >
              100円投入
            </button>
          </div>
          <div className={styles.medalCount}>
            メダル数: {gameStatus.medal}
          </div>
        </div>

        <div>ココに倍率表示？</div>

        <div className={styles.gameSection}>
          <div className={styles.judgment}>{judgment}</div>
          <div className={styles.handDisplay}>
            {renderHand(pcHand)}
          </div>
        </div>

        <div className={styles.buttonRow}>
          <button
            onClick={startGame}
            disabled={gameStatus.isGaming || gameStatus.medal <= 0}
            className={styles.startButton}
          >
            START
          </button>
        </div>

        <div className={styles.handButtons}>
          {[HANDS.GU, HANDS.CHOKI, HANDS.PA].map((hand) => (
            <button
              key={hand}
              onClick={() => handleJanken(hand)}
              disabled={!gameStatus.isGuChokiPaAble}
              className={styles.handButton}
            >
              {renderHand(hand)}
            </button>
          ))}
        </div>

        <div className={styles.multiplierRow}>
          {[2, 4, 8, 16, 32].map((multiplier, index) => (
            <div
              key={multiplier}
              className={`${styles.multiplier} ${
                index + 1 === gameStatus.winCount ? styles.activeMultiplier : ''
              }`}
            >
              {multiplier}
            </div>
          ))}
        </div>
      </main>
    </div>
  );
};

export default JankenGame;