import mainStyles from './JankenMainStyle.module.css';
import { useAtom  } from 'jotai';
import { userStatusAtom } from './userStatusAtom';
import { JankenStatusAtom } from './JankenStatusAtom';
import { pcHandAtom } from './pcHandAtom';
import { judgementAtom } from './judgementAtom';


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

const JankenStartButton = () => {
  const [userStatus, setUserStatus] = useAtom(userStatusAtom);

  const [gameStatus, setGameStatus] = useAtom(JankenStatusAtom);
  const [pcHand, setPcHand] = useAtom(pcHandAtom);
  const [judgement, setJudgement] = useAtom(judgementAtom);


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
    setJudgement({
      judgement: '',
    });
    setPcHand({
      pcHand: 'waiting',
    });
  };










  return (
    <div className={mainStyles.buttonRow}>
      <button
        onClick={startGame}
        disabled={gameStatus.isGaming || userStatus.medal <= 0}
        className={mainStyles.startButton}
      >
        START
      </button>
    </div>
  );
};

export default JankenStartButton;