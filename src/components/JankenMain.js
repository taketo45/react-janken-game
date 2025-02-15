import mainStyles from './JankenMainStyle.module.css';
import { useAtom  } from 'jotai';
import { userStatusAtom } from './userStatusAtom';
import { JankenStatusAtom } from './JankenStatusAtom';
import { pcHandAtom } from './pcHandAtom';
import { judgementAtom } from './judgementAtom';
import GameCoin from './GameCoin';
import JankenRenderPCHand from './JankenRenderPCHand';
import JankenStartButton from './JankenStartButton';


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

  const [gameStatus, setGameStatus] = useAtom(JankenStatusAtom);
  const [pcHand, setPcHand] = useAtom(pcHandAtom);
  const [judgement, setJudgement] = useAtom(judgementAtom);



  const handleJanken = (hand) => {
    if (!gameStatus.isGuChokiPaAble) return;

    const pcHandValue = Math.ceil(Math.random() * 3);
    setPcHand({
      pcHand: pcHandValue,
    });

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
    setJudgement({
      judgement: MESSAGES[result],
    });
    
    if (result === 'EVEN') {
      setTimeout(() => {
        setPcHand({
          pcHand: 'waiting',
        });
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


  const renderButtonHand = (hand) => {
    const hands = {
      [HANDS.GU]: '✊',
      [HANDS.CHOKI]: '✌️',
      [HANDS.PA]: '✋'
    };
    return hands[hand] || '';
  };

  return (
    <main className={mainStyles.main}>
      <GameCoin />

      <JankenRenderPCHand />

      <JankenStartButton />

      <div className={mainStyles.handButtons}>
        {[HANDS.GU, HANDS.CHOKI, HANDS.PA].map((hand) => (
          <button
            key={hand}
            onClick={() => handleJanken(hand)}
            disabled={!gameStatus.isGuChokiPaAble}
            className={mainStyles.handButton}
          >
            {renderButtonHand(hand)}
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