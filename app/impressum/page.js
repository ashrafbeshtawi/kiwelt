import LegalPage from '@/components/LegalPage';

export const metadata = {
  title: 'Impressum — Datenflow',
};

export default function Page() {
  return <LegalPage contentKey="impressum" current="impressum" />;
}
