import LegalPage from '@/components/LegalPage';

export const metadata = {
  title: 'Datenschutz — Datenflow',
};

export default function Page() {
  return <LegalPage contentKey="datenschutz" current="datenschutz" />;
}
