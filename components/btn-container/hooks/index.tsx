import React from "react";

export const useIndexPrefix = (children: any) => {
  let index = 0;
  const addIndexPrefix = () => {
    // Function to add the prefix prop if it doesn't exist
    const addPrefix = (
      child: React.DetailedReactHTMLElement<any, HTMLElement>
    ) => {
      if (!child.props.prefix) {
        const newProps = {
          ...child.props,
          prefix: { text: String(index + 1).padStart(2, "0") + " // " },
        };
        return React.cloneElement(child, newProps);
      }

      return child;
    };

    // Map over the children and apply the index prefix if needed
    const childrenWithPrefix = React.Children.map(children, (child) => {
      index++;
      return addPrefix(child);
    });

    return childrenWithPrefix;
  };

  return addIndexPrefix();
};
