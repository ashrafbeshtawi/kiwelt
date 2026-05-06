import { LuWrench, LuRoute, LuMessageCircleQuestion, LuMail, LuLayers } from 'react-icons/lu';

const ICONS = {
  services: LuWrench,
  process: LuRoute,
  faq: LuMessageCircleQuestion,
  contact: LuMail,
  tools: LuLayers,
};

export default function PageIcon({ name }) {
  const Icon = ICONS[name];
  if (!Icon) return null;
  return (
    <span className="page-icon" aria-hidden>
      <Icon />
    </span>
  );
}
