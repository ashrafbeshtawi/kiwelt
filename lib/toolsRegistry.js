import {
  SiPhp,
  SiSymfony,
  SiPython,
  SiNodedotjs,
  SiHtml5,
  SiCss,
  SiJavascript,
  SiTypescript,
  SiReact,
  SiNextdotjs,
  SiTailwindcss,
  SiOpenai,
  SiAnthropic,
  SiLangchain,
  SiN8N,
  SiPostgresql,
  SiMysql,
  SiMongodb,
  SiRedis,
  SiGraphql,
  SiDocker,
  SiGithubactions,
  SiLinux,
} from 'react-icons/si';
import { LuBlocks, LuPlug } from 'react-icons/lu';

export const TOOLS = {
  php:           { name: 'PHP',            icon: SiPhp,           color: '#777BB4' },
  symfony:       { name: 'Symfony',        icon: SiSymfony,       color: '#FFFFFF' },
  python:        { name: 'Python',         icon: SiPython,        color: '#3776AB' },
  nodejs:        { name: 'Node.js',        icon: SiNodedotjs,     color: '#5FA04E' },

  html:          { name: 'HTML5',          icon: SiHtml5,         color: '#E34F26' },
  css:           { name: 'CSS3',           icon: SiCss,           color: '#1572B6' },
  javascript:    { name: 'JavaScript',     icon: SiJavascript,    color: '#F7DF1E' },
  typescript:    { name: 'TypeScript',     icon: SiTypescript,    color: '#3178C6' },
  react:         { name: 'React',          icon: SiReact,         color: '#61DAFB' },
  nextjs:        { name: 'Next.js',        icon: SiNextdotjs,     color: '#FFFFFF' },
  tailwind:      { name: 'Tailwind CSS',   icon: SiTailwindcss,   color: '#06B6D4' },

  openai:        { name: 'OpenAI',         icon: SiOpenai,        color: '#FFFFFF' },
  anthropic:     { name: 'Anthropic',      icon: SiAnthropic,     color: '#D97757' },
  langchain:     { name: 'LangChain',      icon: SiLangchain,     color: '#1C3C3C' },
  n8n:           { name: 'n8n',            icon: SiN8N,           color: '#EA4B71' },
  dify:          { name: 'Dify',           icon: LuBlocks,        color: '#1C64F2' },

  postgresql:    { name: 'PostgreSQL',     icon: SiPostgresql,    color: '#4169E1' },
  mysql:         { name: 'MySQL',          icon: SiMysql,         color: '#4479A1' },
  mongodb:       { name: 'MongoDB',        icon: SiMongodb,       color: '#47A248' },
  redis:         { name: 'Redis',          icon: SiRedis,         color: '#FF4438' },

  api:           { name: 'REST APIs',      icon: LuPlug,          color: '#22D3A5' },
  graphql:       { name: 'GraphQL',        icon: SiGraphql,       color: '#E10098' },

  docker:        { name: 'Docker',         icon: SiDocker,        color: '#2496ED' },
  githubactions: { name: 'GitHub Actions', icon: SiGithubactions, color: '#2088FF' },
  linux:         { name: 'Linux',          icon: SiLinux,         color: '#FCC624' },
};
