import React from "react";
import { logServerEvent, serverTestEvent } from "@/lib/analytics/logger";
import { cn } from "@/lib/utils";
type Props = {
  href: string;
  projectID: string;
  className?: string;
  children?: React.ReactNode;
};

const LoggedNavigationBTN = ({
  href,
  projectID,
  children,
  className,
}: Props) => {
  return (
    <a
      href={href}
      className={cn(className)}
      onClick={async () => {
        await logServerEvent("navigated_to_project", {
          distinctID: "navigated_to_project",
          properties: { url: href, projectID: projectID },
        });
        console.log("Visited ", projectID);
      }}
    >
      {children}
    </a>
  );
};

export default LoggedNavigationBTN;
