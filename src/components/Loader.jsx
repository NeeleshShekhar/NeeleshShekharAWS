import { ClimbingBoxLoader, PacmanLoader } from "react-spinners";
const Loader = () => {
  return (
    <div className='absolute z-50 h-full w-full  opacity-70 '>
      {/* <ClimbingBoxLoader
        className='absolute left-[50%] top-[300px] z-50 '
        color='#7336d6'
        size={15}
        speedMultiplier={2}
      /> */}
      <PacmanLoader
      className='absolute left-[50%] top-[300px] z-50 '
      color='#3487c6'
      size={15}
      speedMultiplier={2} />
    </div>
  );
};

export default Loader;
