import pcHandStyles from './JankenRenderPCHandStyle.module.css';
import { pcHandAtom } from '../atoms/pcHandAtom';
import { judgementAtom } from '../atoms/judgementAtom';
import { useAtom } from 'jotai';


const HANDS = {
  GU: 1,
  CHOKI: 2,
  PA: 3,
};


const JankenRenderPCHand = () => {
  const [pcHandState] = useAtom(pcHandAtom);
  const [judgementState] = useAtom(judgementAtom);


  const renderHand = (hand) => {
    if (hand === 'waiting') {
      return <img src="./img/guchopa.gif" alt="じゃん...けん..." />;
    }
    const hands = {
      [HANDS.GU]: <img src="./img/gu.png" alt="ぐー" />,
      [HANDS.CHOKI]: <img src="./img/choki.png" alt="ちょき" />,
      [HANDS.PA]: <img src="./img/pa.png" alt="ぱー" />
    };
    return hands[hand] || '';
  };


  return (
      <div className={pcHandStyles.gameSection}>
        <div className={pcHandStyles.judgment}>{judgementState.judgement}</div>
        <div className={pcHandStyles.handDisplay}>
          {renderHand(pcHandState.pcHand)}
        </div>
      </div>

  );
};

export default JankenRenderPCHand;