import "./globals.css";
import { Inter } from "next/font/google";
import BtnContainer from "@/components/btn-container";
import BtnExpandable from "@/components/btn-container/btn-expandable";

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
              <BtnExpandable defaultLabel={"TEST"} />
              <BtnExpandable defaultLabel={"TEST"} />
            </BtnContainer>
          </div>
        </div>
      </body>
    </html>
  );
}
