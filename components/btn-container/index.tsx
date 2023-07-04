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
    let index = 0;

    // Function to add the prefix prop if it doesn't exist
    const addIndexPrefix = (child) => {
      if (!child.props.prefix) {
        const newProps = {
          ...child.props,
          prefix: String(index + 1).padStart(2, "0") + " //"
        };
        return React.cloneElement(child, newProps);
      }

      return child;
    };

    // Map over the children and apply the index prefix if needed
    const childrenWithIndexPrefix = React.Children.map(children, (child) => {
      index++;
      return addIndexPrefix(child);
    });

  return (
    <div className="flex justify-center items-center my-0 mx-[18px] relative">
      {childrenWithIndexPrefix}
      <BtnBack />
    </div>
  );
}

export default BtnContainer;