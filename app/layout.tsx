import './globals.css'
import { Inter } from 'next/font/google'
import BtnContainer from '@/components/btn-container';
import BtnExpandable from '@/components/btn-container/btn-expandable';

const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: "FCS - Portfolio",
  description: "000-Portfolio",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <div className="h-full w-full overflow-y-hidden">
          <div
            className={`bg-black h-[calc(100vh-129px)] overflow-x-hidden text-center relative hud-border`}
          >
            {children}
          </div>
          <div
            className={`flex justify-between items-center h-[75px] bottom-0 text-center hud-border`}
          >
            <BtnContainer>
              <BtnExpandable 
                defaultLabel={'TEST'} 
                onClick={function (): void {
                  throw new Error('Function not implemented.');
                } }
              >
              </BtnExpandable>
            </BtnContainer>
          </div>
        </div>
      </body>
    </html>
  );
}