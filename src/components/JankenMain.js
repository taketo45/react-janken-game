// JankenGame.jsx
import React, { useState } from 'react';
import mainStyles from './JankenMainStyle.module.css';
import { useAtom  } from 'jotai';
import { userStatusAtom } from './userStatusAtom';


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

const JankenMain = () => {
  const [userStatus, setUserStatus] = useAtom(userStatusAtom);

  const [gameStatus, setGameStatus] = useState({
    winCount: 0,
    // medal: 0,
    isGuChokiPaAble: false,
    isStartAble: true,
    isGaming: false,
  });
  
  const [judgment, setJudgment] = useState('');
  const [pcHand, setPcHand] = useState(null);
  
  const insertCoins = (amount) => {
    if (gameStatus.isGaming) return;
    // setGameStatus(prev => ({
    //   ...prev,
    //   medal: prev.medal + amount
    // }));
    setUserStatus(prev => ({
      ...prev,
      medal: prev.medal + amount
    }));
  };

  const startGame = () => {
    if (gameStatus.isGaming || userStatus.medal <= 0) {
      if (userStatus.medal <= 0) alert(MESSAGES.BUY_MEDAL);
      return;
    }

    setGameStatus(prev => ({
      ...prev,
      isGaming: true,
      isGuChokiPaAble: true,
      // medal: prev.medal - 1
    }));
    setUserStatus(prev => ({
      ...prev,
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
        // medal: prev.medal + getWinMedals(prev.winCount + 1),
        isGuChokiPaAble: false,
        isGaming: false
      }));
      setUserStatus(prev => ({
        ...prev,
        totalWinCount: prev.totalWinCount + 1,
        medal: prev.medal + getWinMedals(gameStatus.winCount)
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
    <main className={mainStyles.main}>
      <div className={mainStyles.coinSection}>
        <div className={mainStyles.buttonRow}>
          <button 
            onClick={() => insertCoins(1)} 
            className={mainStyles.coinButton}
            disabled={gameStatus.isGaming}
          >
            10円投入
          </button>
          <button 
            onClick={() => insertCoins(10)}
            className={mainStyles.coinButton}
            disabled={gameStatus.isGaming}
          >
            100円投入
          </button>
        </div>
        <div className={mainStyles.medalCount}>
          メダル数: {userStatus.medal}
        </div>
      </div>

      <div>ココに倍率表示？</div>

      <div className={mainStyles.gameSection}>
        <div className={mainStyles.judgment}>{judgment}</div>
        <div className={mainStyles.handDisplay}>
          {renderHand(pcHand)}
        </div>
      </div>

      <div className={mainStyles.buttonRow}>
        <button
          onClick={startGame}
          disabled={gameStatus.isGaming || userStatus.medal <= 0}
          className={mainStyles.startButton}
        >
          START
        </button>
      </div>

      <div className={mainStyles.handButtons}>
        {[HANDS.GU, HANDS.CHOKI, HANDS.PA].map((hand) => (
          <button
            key={hand}
            onClick={() => handleJanken(hand)}
            disabled={!gameStatus.isGuChokiPaAble}
            className={mainStyles.handButton}
          >
            {renderHand(hand)}
          </button>
        ))}
      </div>

      <div className={mainStyles.multiplierRow}>
        {[2, 4, 8, 16, 32].map((multiplier, index) => (
          <div
            key={multiplier}
            className={`${mainStyles.multiplier} ${
              index + 1 === gameStatus.winCount ? mainStyles.activeMultiplier : ''
            }`}
          >
            {multiplier}
          </div>
        ))}
      </div>
    </main>
  );
};

export default JankenMain;