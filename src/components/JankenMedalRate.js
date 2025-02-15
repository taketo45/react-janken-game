import mainStyles from './JankenMainStyle.module.css';
import { useAtom  } from 'jotai';
import { JankenStatusAtom } from './JankenStatusAtom';


const JankenMedalRate = () => {

  const [gameStatus, setGameStatus] = useAtom(JankenStatusAtom);


  return (
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
  );
};

export default JankenMedalRate;