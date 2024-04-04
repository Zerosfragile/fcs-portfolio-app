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
          prefix: {
            breakpoint: 1100,
            text: String(index).padStart(2, "0") + " // ",
          },
          id: index + child.props.defaultLabel,
          key: index,
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

export const handleRoute = (route: string, router: AppRouterInstance) => {
  if (!route) {
    throw new Error("Route parameter is required.");
  }

  const isInternalRoute = /^\/([a-zA-Z0-9-_]+\/?)*$/.test(route); // Internal route pattern validation

  if (
    !isInternalRoute &&
    !route.startsWith("http://") &&
    !route.startsWith("https://")
  ) {
    throw new Error(`Invalid route: ${route}`);
  }

  if (route.startsWith("http://") || route.startsWith("https://")) {
    // External URL: open in a new tab
    window.open(route, "_blank");
  } else {
    // Internal route: handle using Next.js routing
    return router.push(route);
  }
};
