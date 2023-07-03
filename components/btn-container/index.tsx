import React from 'react'

type Props = {
  children?: React.ReactNode;
  direction?: "horizontal" | "vertical";
};

const BtnBack = () => {
  return <div></div>;
};


const BtnContainer = (props: Props) => {
  const { direction = "horizontal", children } = props;

  return (
    <div className='flex justify-center items-center my-0 mx-[18px] relative'>
      {children}
      <BtnBack/>
    </div>
  )
}

export default BtnContainer;