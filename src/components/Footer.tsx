import React from 'react';
import { Github } from 'lucide-react';
import { useTranslation } from 'react-i18next';

const Footer: React.FC = () => {
  const { t } = useTranslation();

  return (
    <footer className="w-full py-6 px-4 mt-8 border-t border-skull-100">
      <div className="max-w-7xl mx-auto text-center text-sm text-skull-500 space-y-2">
        <p>
          {t('footer.bugOrContribute')}{' '}
          <a
            href="https://github.com/robertosolari/skull-scorecard-harmony/issues"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1 text-skull-700 hover:text-skull-900 underline underline-offset-2"
          >
            <Github className="h-3.5 w-3.5" />
            {t('footer.openIssue')}
          </a>
        </p>
        <p className="text-xs text-skull-400">
          {t('footer.prWelcome')}
        </p>
      </div>
    </footer>
  );
};

export default Footer;
