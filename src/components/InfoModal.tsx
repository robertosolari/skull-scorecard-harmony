
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
import { useTranslation } from 'react-i18next';

interface InfoModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const InfoModal: React.FC<InfoModalProps> = ({ isOpen, onClose }) => {
  const { t } = useTranslation();
  const scoringRules = t('infoModal.scoringRules', { returnObjects: true }) as string[];
  const bonusRules = t('infoModal.bonusRules', { returnObjects: true }) as string[];
  const howToUseSteps = t('infoModal.howToUseSteps', { returnObjects: true }) as string[];
  const notes = t('infoModal.notes', { returnObjects: true }) as string[];

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md animate-scale-in">
        <DialogHeader>
          <DialogTitle className="text-2xl font-semibold">{t('infoModal.title')}</DialogTitle>
          <DialogDescription>
            {t('infoModal.description')}
          </DialogDescription>
        </DialogHeader>
        <ScrollArea className="max-h-[60vh] pr-4">
          <div className="space-y-4 text-left">
            <div>
              <h3 className="font-medium text-lg text-skull-700">{t('infoModal.scoringTitle')}</h3>
              <ul className="list-disc pl-5 space-y-2 mt-2">
                {scoringRules.map((rule, i) => (
                  <li key={i} dangerouslySetInnerHTML={{ __html: rule }} />
                ))}
              </ul>
            </div>

            <div>
              <h3 className="font-medium text-lg text-skull-700">{t('infoModal.bonusTitle')}</h3>
              <ul className="list-disc pl-5 space-y-2 mt-2">
                {bonusRules.map((rule, i) => (
                  <li key={i} dangerouslySetInnerHTML={{ __html: rule }} />
                ))}
              </ul>
            </div>

            <div>
              <h3 className="font-medium text-lg text-skull-700">{t('infoModal.howToUseTitle')}</h3>
              <ol className="list-decimal pl-5 space-y-2 mt-2">
                {howToUseSteps.map((step, i) => (
                  <li key={i}>{step}</li>
                ))}
              </ol>
            </div>

            <div>
              <h3 className="font-medium text-lg text-skull-700">{t('infoModal.notesTitle')}</h3>
              <ul className="list-disc pl-5 space-y-2 mt-2">
                {notes.map((note, i) => (
                  <li key={i}>{note}</li>
                ))}
              </ul>
            </div>
          </div>
        </ScrollArea>
        <DialogClose asChild>
          <Button className="button-primary w-full mt-4">{t('infoModal.gotIt')}</Button>
        </DialogClose>
      </DialogContent>
    </Dialog>
  );
};

export default InfoModal;
