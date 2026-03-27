
import React from 'react';
import { Info, Github } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface HeaderProps {
  openInfoModal: () => void;
}

const Header: React.FC<HeaderProps> = ({ openInfoModal }) => {
  return (
    <header className="w-full py-6 px-4">
      <div className="max-w-7xl mx-auto flex justify-between items-center">
        <div className="flex items-center space-x-2">
          <h1 className="text-lg sm:text-2xl font-semibold tracking-tight bg-gradient-to-r from-skull-700 to-skull-900 bg-clip-text text-transparent">
            Skull King Scorecard
          </h1>
          <div className="tag animate-in delayed-100">Beta</div>
        </div>
        <div className="flex items-center space-x-2">
          <a
            href="https://github.com/robertosolari/skull-scorecard-harmony"
            target="_blank"
            rel="noopener noreferrer"
          >
            <Button
              variant="ghost"
              size="icon"
              className="rounded-full h-10 w-10 bg-skull-100 text-skull-700 hover:bg-skull-200 transition-all"
            >
              <Github className="h-5 w-5" />
            </Button>
          </a>
          <Button
            variant="ghost"
            size="icon"
            onClick={openInfoModal}
            className="rounded-full h-10 w-10 bg-skull-100 text-skull-700 hover:bg-skull-200 transition-all"
          >
            <Info className="h-5 w-5" />
          </Button>
        </div>
      </div>
    </header>
  );
};

export default Header;
