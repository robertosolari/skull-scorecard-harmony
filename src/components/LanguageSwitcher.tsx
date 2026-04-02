import React from 'react';
import { useTranslation } from 'react-i18next';
import { Button } from '@/components/ui/button';

const LanguageSwitcher: React.FC = () => {
  const { i18n } = useTranslation();

  const toggleLanguage = () => {
    const newLang = i18n.language === 'it' ? 'en' : 'it';
    i18n.changeLanguage(newLang);
    document.documentElement.lang = newLang;
  };

  const isItalian = i18n.language?.startsWith('it');

  return (
    <Button
      variant="ghost"
      size="icon"
      onClick={toggleLanguage}
      className="rounded-full h-10 w-10 bg-skull-100 text-skull-700 hover:bg-skull-200 transition-all text-sm font-semibold"
      title={isItalian ? 'Switch to English' : 'Passa all\'italiano'}
    >
      {isItalian ? 'EN' : 'IT'}
    </Button>
  );
};

export default LanguageSwitcher;
