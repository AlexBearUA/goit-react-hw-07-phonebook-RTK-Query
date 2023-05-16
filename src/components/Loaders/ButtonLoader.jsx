import { RotatingLines } from 'react-loader-spinner';

export const ButtonLoader = () => {
  return (
    <div className="btn-spinner">
      <RotatingLines
        strokeColor="grey"
        strokeWidth="5"
        animationDuration="0.75"
        width="12"
        visible={true}
      />
    </div>
  );
};
