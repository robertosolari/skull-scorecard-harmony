
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
          <DialogTitle className="text-2xl font-semibold">Regole Skull King</DialogTitle>
          <DialogDescription>
            Segnapunti per il gioco di carte Skull King
          </DialogDescription>
        </DialogHeader>
        <ScrollArea className="max-h-[60vh] pr-4">
          <div className="space-y-4 text-left">
            <div>
              <h3 className="font-medium text-lg text-skull-700">Punteggio "Skull King":</h3>
              <ul className="list-disc pl-5 space-y-2 mt-2">
                <li>Ogni round i giocatori prevedono quante prese faranno</li>
                <li><strong>Previsione ≥1 azzeccata:</strong> 20 punti per ogni presa</li>
                <li><strong>Previsione ≥1 sbagliata:</strong> -10 punti per ogni presa di differenza</li>
                <li><strong>Previsione 0 azzeccata:</strong> +10 punti per ogni carta distribuita nel round</li>
                <li><strong>Previsione 0 sbagliata:</strong> -10 punti per ogni carta distribuita nel round</li>
              </ul>
            </div>

            <div>
              <h3 className="font-medium text-lg text-skull-700">Punti Bonus (solo se previsione corretta):</h3>
              <ul className="list-disc pl-5 space-y-2 mt-2">
                <li>Carte di valore 14 (semi normali): <strong>+10</strong> ciascuna</li>
                <li>Carta nera di valore 14: <strong>+20</strong></li>
                <li>Sirena catturata da Pirata: <strong>+20</strong></li>
                <li>Pirata catturato da Skull King: <strong>+30</strong></li>
                <li>Skull King catturato da Sirena: <strong>+40</strong></li>
              </ul>
            </div>

            <div>
              <h3 className="font-medium text-lg text-skull-700">Come usare l'app:</h3>
              <ol className="list-decimal pl-5 space-y-2 mt-2">
                <li>Aggiungi i giocatori (2-8)</li>
                <li>Inserisci le previsioni a inizio round</li>
                <li>Dopo il round, inserisci le prese fatte e i bonus</li>
                <li>I punteggi vengono calcolati automaticamente</li>
                <li>Si giocano 10 round</li>
              </ol>
            </div>

            <div>
              <h3 className="font-medium text-lg text-skull-700">Note:</h3>
              <ul className="list-disc pl-5 space-y-2 mt-2">
                <li>Con 8 giocatori i round 8, 9 e 10 hanno max 8 carte</li>
                <li>I bonus vanno inseriti manualmente sommando i punti delle carte catturate</li>
              </ul>
            </div>
          </div>
        </ScrollArea>
        <DialogClose asChild>
          <Button className="button-primary w-full mt-4">Ho capito</Button>
        </DialogClose>
      </DialogContent>
    </Dialog>
  );
};

export default InfoModal;
