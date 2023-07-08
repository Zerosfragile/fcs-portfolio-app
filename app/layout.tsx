import "./globals.css";
import { Inter } from "next/font/google";
import HUDN from "@/components/hud-nav-system";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "FCS - Portfolio",
  description: "000-Portfolio",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <div className="h-full w-full overflow-y-hidden">
          <div className="bg-black hud-border relative h-[calc(100vh-129px)] overflow-x-hidden text-center">
            {children}
          </div>
          <div className="hud-border bottom-0 flex h-[75px] items-center justify-between text-center">
            <HUDN.container>
              <HUDN.btn
                labels={[{ breakpoint: 850, text: "About" }]}
                defaultLabel="About Me"
                route="/About"
                sites={[
                  {
                    title: "Blog Posts",
                    route: "/blog",
                  },
                  {
                    title: "Github",
                    route: "https://github.com/Zerosfragile",
                  },
                  {
                    title: "More",
                    route: "/about",
                  },
                ]}
              />
              <HUDN.btn
                defaultLabel="Projects"
                route="/Projects"
                sites={[
                  {
                    title: "Ascii-Hud",
                    route: "https://fragileservices.com",
                  },
                  {
                    title: "Playground",
                    route: "/projects/playground",
                  },
                  {
                    title: "More",
                    route: "/projects",
                  },
                ]}
              />
              <HUDN.btn
                defaultLabel="Resume"
                route="/Resume"
                sites={[
                  {
                    title: "PDF View",
                    route: "/resume/pdf",
                  },
                  {
                    title: "More",
                    route: "/resume",
                  },
                ]}
              />
            </HUDN.container>
          </div>
        </div>
      </body>
    </html>
  );
}
