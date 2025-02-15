
import mainStyles from './JankenMainStyle.module.css';
import { useAtom  } from 'jotai';
import { userStatusAtom } from './userStatusAtom';
import { JankenStatusAtom } from './JankenStatusAtom';


const GameCoin = () => {
  const [userStatus, setUserStatus] = useAtom(userStatusAtom);
  const [gameStatus] = useAtom(JankenStatusAtom);
  
  const insertCoins = (amount) => {
    if (gameStatus.isGaming) return;
    setUserStatus(prev => ({
      ...prev,
      medal: prev.medal + amount
    }));
  };


  return (
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
  );
};

export default GameCoin;