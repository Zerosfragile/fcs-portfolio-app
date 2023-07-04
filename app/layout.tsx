import "./globals.css";
import { Inter } from "next/font/google";
import BtnContainer from "@/components/hud-nav-system/exposed";
import BtnExpandable from "@/components/hud-nav-system/internal/hn-btn";
import BtnExpandableItem from "@/components/hud-nav-system/internal/hn-item";

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
            <BtnContainer>
              <BtnExpandable
                labels={[{ breakpoint: 850, text: "About" }]}
                defaultLabel="About Me"
                route="/About"
              >
                <BtnExpandableItem label="Blog Posts" route="/Blog" />
                <BtnExpandableItem
                  label="Git Hub"
                  route="https://github.com/Zerosfragile"
                />
                <BtnExpandableItem label="More" route="/About" />
              </BtnExpandable>
              <BtnExpandable defaultLabel="Projects" route="" />
            </BtnContainer>
          </div>
        </div>
      </body>
    </html>
  );
}
