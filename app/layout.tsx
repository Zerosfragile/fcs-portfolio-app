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
            {/* <HUDN.container>
              <HUDN.btn
                labels={[{ breakpoint: 850, text: "About" }]}
                defaultLabel="About Me"
                route="/About"
              >
                <HUDN.item label="Blog Posts" route="/Blog" />
                <HUDN.item
                  label="Git Hub"
                  route="https://github.com/Zerosfragile"
                />
                <HUDN.item label="More" route="/About" />
              </HUDN.btn>
              <HUDN.btn defaultLabel="Projects" route="" />
            </HUDN.container> */}
            <HUDN.container>
              <HUDN.btn title="Title 1" subtitle="Subtitle 1" />
              <HUDN.btn title="Title 2" subtitle="Subtitle 2" />
              <HUDN.btn title="Title 3" subtitle="Subtitle 3" />
            </HUDN.container>
          </div>
        </div>
      </body>
    </html>
  );
}
