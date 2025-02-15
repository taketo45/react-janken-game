import mainStyles from './JankenMainStyle.module.css';
import GameCoin from './GameCoin';
import JankenRenderPCHand from './JankenRenderPCHand';
import JankenStartButton from './JankenStartButton';
import JankenHandsButtons from './JankenHandsButtons';
import JankenMedalRate from './JankenMedalRate';


const JankenMain = () => {


  return (
    <main className={mainStyles.main}>
      <GameCoin />

      <JankenRenderPCHand />

      <JankenStartButton />

      <JankenHandsButtons />

      <JankenMedalRate />
    </main>
  );
};

export default JankenMain;