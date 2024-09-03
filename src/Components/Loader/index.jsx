import dlyaLogo from '../../assets/png/log.jpg'
import 'animate.css';
export const Loader = () => {
    return (
      <div className="w-100 animate__animated animate__pulse">
      <div class="pulseWrapper">
      <div class="pulse">
        <img src={dlyaLogo} width={'100'} />
      </div>
      </div>
    </div>
    );
  };
