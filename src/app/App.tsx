import { GlassSurface } from '@/components/ui/GlassSurface';

const LEVELS = [
  {
    name: 'Thin',
    usage: 'Dock, top bar',
    level: 'thin',
  },
  {
    name: 'Regular',
    usage: 'Timer, music player',
    level: 'regular',
  },
  {
    name: 'Thick',
    usage: 'Tasks, notes, settings',
    level: 'thick',
  },
] as const;

const BACKGROUNDS = [
  { label: 'Dark scene', className: 'bg-[url(/scenes/test-dark.jpg)]' },
  { label: 'Light scene', className: 'bg-[url(/scenes/test-light.jpg)]' },
];

export const App = () => {
  return (
    <main className="flex min-h-dvh flex-col">
      {BACKGROUNDS.map((bg) => (
        <section
          key={bg.label}
          className={`flex flex-1 flex-wrap items-center justify-center gap-6 bg-cover bg-center p-6 ${bg.className}`}
        >
          {LEVELS.map((level) => (
            <GlassSurface key={level.name} level={level.level} className="w-64 p-6">
              <h2 className="text-lg font-semibold">{level.name}</h2>
              <p className="text-sm">{level.usage}</p>
              <p className="mt-3 text-xs">{bg.label}: is this text easy to read?</p>
            </GlassSurface>
          ))}
        </section>
      ))}
    </main>
  );
};
