import { useLanguage } from '../context/LanguageContext';

export default function UnderDevelopment({ title }) {
  const { t } = useLanguage();

  return (
    <div className="min-h-[60vh] flex items-center justify-center">
      <div className="text-center">
        <h1 className="text-3xl font-bold text-neutral-800 mb-2">{t('underDevelopment')}</h1>
      </div>
    </div>
  );
}
