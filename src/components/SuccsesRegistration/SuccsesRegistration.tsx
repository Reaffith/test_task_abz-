import succesImg from '../../../public/success-image.svg';
import './SuccsesRegistration.scss';

export const SuccsesRegistration = () => {
  return (
    <div className="succes">
      <h1 className="succes_header">User successfully registered</h1>
      <img src={succesImg} alt="Succes" className="succes_img" />
    </div>
  );
};
