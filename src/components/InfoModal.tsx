
import React from 'react';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogClose
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { ScrollArea } from '@/components/ui/scroll-area';

interface InfoModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const InfoModal: React.FC<InfoModalProps> = ({ isOpen, onClose }) => {
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md animate-scale-in">
        <DialogHeader>
          <DialogTitle className="text-2xl font-semibold">How to Play Skull King</DialogTitle>
          <DialogDescription>
            Track scores for the trick-taking card game Skull King
          </DialogDescription>
        </DialogHeader>
        <ScrollArea className="max-h-[60vh] pr-4">
          <div className="space-y-4 text-left">
            <div>
              <h3 className="font-medium text-lg text-skull-700">Scoring Rules:</h3>
              <ul className="list-disc pl-5 space-y-2 mt-2">
                <li>Each round, players bid how many tricks they think they'll win</li>
                <li>Correct bid: 20 points × round number for each trick</li>
                <li>Missed bid: -10 points × difference between bid and actual tricks</li>
                <li>Bonus points:
                  <ul className="list-disc pl-5 mt-1">
                    <li>Capturing Skull King: +30 points</li>
                    <li>Capturing pirate with pirate: +20 points</li>
                    <li>Each captured mermaid: +10 points</li>
                  </ul>
                </li>
              </ul>
            </div>
            
            <div>
              <h3 className="font-medium text-lg text-skull-700">How to use this app:</h3>
              <ol className="list-decimal pl-5 space-y-2 mt-2">
                <li>Add players using the form at the top</li>
                <li>Enter bids for each player at the start of a round</li>
                <li>After the round completes, enter actual tricks won</li>
                <li>Scores will be automatically calculated</li>
                <li>Continue for all 10 rounds</li>
              </ol>
            </div>
          </div>
        </ScrollArea>
        <DialogClose asChild>
          <Button className="button-primary w-full mt-4">Got it</Button>
        </DialogClose>
      </DialogContent>
    </Dialog>
  );
};

export default InfoModal;
