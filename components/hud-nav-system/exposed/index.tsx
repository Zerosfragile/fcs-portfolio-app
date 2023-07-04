// "use client";
// import React from "react";
// import BtnExpandable, { Props as BtnExpandableProps } from "../internal/hn-btn";
// import { useIndexPrefix } from "../internal/hooks";
// import BtnBack from "../internal/hn-back";
// import { useRouter } from "next/navigation";
// import { Url } from "next/dist/shared/lib/router/router";

// type Props = {
//   children?: React.ReactNode;
// };

// const BtnContainer = (props: Props) => {
//   const { children } = props;
//   const router = useRouter();

//   const handleClick = (route: any, eventKey: any) => {
//     if (route) {
//       // Handle Route
//       console.log(route);
//       if (route.startsWith("http://") || route.startsWith("https://")) {
//         // External URL: open in a new tab
//         window.open(route, "_blank");
//       } else {
//         // Internal route: handle using Next.js routing
//         router.push(route);
//       }
//     }
//     // else if (eventKey && eventHandlers[eventKey]) {
//     //   //Handle Function
//     //   eventHandlers[eventKey]();
//     // }
//   };

//   const indexedChildren = useIndexPrefix(children);
//   return (
//     <div className="relative mx-[18px] my-0 flex items-center justify-center">
//       {indexedChildren}
//       <BtnBack isTriggered={false} breakpoint={0} items={[]} />
//     </div>
//   );
// };

// export default BtnContainer;
