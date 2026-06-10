import type { DesignSystem, Page, SlideMeta, SlideTransition } from '@open-slide/core';
import { useSlidePageNumber } from '@open-slide/core';

export const design: DesignSystem = {
  palette: {
    bg: '#07080d',
    text: '#f0f1f8',
    accent: '#7c6dfa',
  },
  fonts: {
    display: '"Inter", "SF Pro Display", system-ui, -apple-system, sans-serif',
    body: '"Inter", system-ui, -apple-system, sans-serif',
  },
  typeScale: {
    hero: 160,
    body: 38,
  },
  radius: 14,
};

const palette = {
  bg: design.palette.bg,
  text: design.palette.text,
  accent: design.palette.accent,
  surface: '#0e1018',
  surfaceHi: '#141620',
  border: 'rgba(255,255,255,0.07)',
  borderBright: 'rgba(255,255,255,0.14)',
  muted: '#6b6e85',
  textSoft: '#b8bcce',
  accentSoft: '#a89ff8',
  mint: '#5ed3a8',
  amber: '#e0b462',
};

const font = {
  sans: design.fonts.body,
  mono: '"JetBrains Mono", "SF Mono", ui-monospace, monospace',
};

const fill = {
  width: '100%',
  height: '100%',
  background: 'var(--osd-bg)',
  color: 'var(--osd-text)',
  fontFamily: 'var(--osd-font-body)',
  overflow: 'hidden',
  position: 'relative' as const,
};

// ─── Animations ───────────────────────────────────────────────────────────────
const globalStyles = `
  @keyframes osc-fadeUp {
    from { opacity: 0; transform: translateY(20px); }
    to   { opacity: 1; transform: translateY(0); }
  }
  @keyframes osc-fadeIn {
    from { opacity: 0; }
    to   { opacity: 1; }
  }
  @keyframes osc-glowPulse {
    0%, 100% { opacity: 0.5; }
    50%      { opacity: 1; }
  }
  @keyframes osc-shimmer {
    from { background-position: -200% center; }
    to   { background-position: 200% center; }
  }
  @keyframes osc-pillIn {
    from { opacity: 0; transform: translateX(-16px); }
    to   { opacity: 1; transform: translateX(0); }
  }
  @keyframes osc-cardIn {
    from { opacity: 0; transform: translateY(24px) scale(0.97); }
    to   { opacity: 1; transform: translateY(0) scale(1); }
  }
  .osc-fadeUp { opacity: 0; animation: osc-fadeUp 0.85s cubic-bezier(0.2,0.8,0.2,1) forwards; }
  .osc-fadeIn { opacity: 0; animation: osc-fadeIn 1.1s ease forwards; }
  .osc-pillIn { opacity: 0; animation: osc-pillIn 0.7s cubic-bezier(0.2,0.8,0.2,1) forwards; }
  .osc-cardIn { opacity: 0; animation: osc-cardIn 0.75s cubic-bezier(0.2,0.8,0.2,1) forwards; }
`;

const Styles = () => <style>{globalStyles}</style>;

// ─── Shared chrome ────────────────────────────────────────────────────────────
const GridBg = () => (
  <div
    style={{
      position: 'absolute',
      inset: 0,
      backgroundImage:
        'linear-gradient(rgba(124,109,250,0.04) 1px, transparent 1px), linear-gradient(90deg, rgba(124,109,250,0.04) 1px, transparent 1px)',
      backgroundSize: '80px 80px',
      maskImage: 'radial-gradient(ellipse 120% 100% at center, rgba(0,0,0,0.8) 0%, rgba(0,0,0,0) 75%)',
      WebkitMaskImage: 'radial-gradient(ellipse 120% 100% at center, rgba(0,0,0,0.8) 0%, rgba(0,0,0,0) 75%)',
      pointerEvents: 'none',
    }}
  />
);

const Eyebrow = ({ children, delay = 0 }: { children: React.ReactNode; delay?: number }) => (
  <div
    className="osc-fadeUp"
    style={{
      animationDelay: `${delay}s`,
      fontFamily: font.mono,
      fontSize: 20,
      letterSpacing: '0.2em',
      textTransform: 'uppercase',
      color: palette.muted,
    }}
  >
    {children}
  </div>
);

const PageFooter = () => {
  const { current, total } = useSlidePageNumber();
  return (
    <div
      style={{
        position: 'absolute',
        bottom: 52,
        right: 120,
        fontFamily: font.mono,
        fontSize: 18,
        color: palette.muted,
        letterSpacing: '0.08em',
      }}
    >
      {String(current).padStart(2, '0')} / {String(total).padStart(2, '0')}
    </div>
  );
};

// ─── Feature Card ─────────────────────────────────────────────────────────────
const FeatureCard = ({
  icon,
  title,
  description,
  accentColor,
  delay,
}: {
  icon: string;
  title: string;
  description: string;
  accentColor: string;
  delay: number;
}) => (
  <div
    className="osc-cardIn"
    style={{
      animationDelay: `${delay}s`,
      background: palette.surface,
      border: `1px solid ${palette.border}`,
      borderRadius: 'var(--osd-radius)',
      padding: '36px 40px',
      display: 'flex',
      flexDirection: 'column',
      gap: 20,
      position: 'relative',
      overflow: 'hidden',
    }}
  >
    <div
      style={{
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        height: 2,
        background: `linear-gradient(90deg, transparent, ${accentColor}88, transparent)`,
      }}
    />
    <div
      style={{
        width: 52,
        height: 52,
        borderRadius: 12,
        background: `${accentColor}18`,
        border: `1px solid ${accentColor}40`,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        fontSize: 26,
      }}
    >
      {icon}
    </div>
    <div>
      <div
        style={{
          fontFamily: 'var(--osd-font-display)',
          fontSize: 32,
          fontWeight: 700,
          color: palette.text,
          letterSpacing: '-0.02em',
          marginBottom: 10,
        }}
      >
        {title}
      </div>
      <div
        style={{
          fontSize: 24,
          color: palette.textSoft,
          lineHeight: 1.5,
          fontFamily: font.sans,
        }}
      >
        {description}
      </div>
    </div>
  </div>
);

// ─── Command Pill ─────────────────────────────────────────────────────────────
const CommandPill = ({
  step,
  command,
  label,
  color,
  delay,
}: {
  step: string;
  command: string;
  label: string;
  color: string;
  delay: number;
}) => (
  <div
    className="osc-pillIn"
    style={{
      animationDelay: `${delay}s`,
      display: 'flex',
      alignItems: 'center',
      gap: 32,
      padding: '24px 36px',
      background: palette.surface,
      border: `1px solid ${palette.border}`,
      borderRadius: 'var(--osd-radius)',
    }}
  >
    <span
      style={{
        fontFamily: font.mono,
        fontSize: 20,
        color: palette.muted,
        letterSpacing: '0.1em',
        minWidth: 36,
      }}
    >
      {step}
    </span>
    <div
      style={{
        flex: 1,
        display: 'flex',
        alignItems: 'center',
        gap: 16,
      }}
    >
      <span style={{ color: palette.mint, fontFamily: font.mono, fontSize: 28 }}>$</span>
      <span
        style={{
          fontFamily: font.mono,
          fontSize: 28,
          color: color,
          fontWeight: 500,
          letterSpacing: '-0.01em',
        }}
      >
        {command}
      </span>
    </div>
    <span
      style={{
        fontFamily: font.sans,
        fontSize: 22,
        color: palette.muted,
      }}
    >
      {label}
    </span>
  </div>
);

// ─── Page 1: Cover ────────────────────────────────────────────────────────────
const Cover: Page = () => (
  <div style={fill}>
    <Styles />
    <GridBg />
    {/* Radial glow */}
    <div
      style={{
        position: 'absolute',
        top: '30%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: 900,
        height: 600,
        background: `radial-gradient(ellipse, ${palette.accent}22 0%, transparent 70%)`,
        pointerEvents: 'none',
        animation: 'osc-glowPulse 4s ease-in-out infinite',
      }}
    />

    <div
      style={{
        position: 'absolute',
        inset: 0,
        padding: '100px 140px',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
      }}
    >
      {/* Top row */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <Eyebrow delay={0.05}>open-slide</Eyebrow>
        <div
          className="osc-fadeIn"
          style={{
            animationDelay: '0.1s',
            fontFamily: font.mono,
            fontSize: 18,
            color: palette.muted,
            border: `1px solid ${palette.border}`,
            padding: '8px 18px',
            borderRadius: 999,
          }}
        >
          v1
        </div>
      </div>

      {/* Hero */}
      <div>
        <h1
          className="osc-fadeUp"
          style={{
            animationDelay: '0.2s',
            fontFamily: 'var(--osd-font-display)',
            fontSize: 'var(--osd-size-hero)',
            fontWeight: 800,
            lineHeight: 1.0,
            letterSpacing: '-0.04em',
            margin: 0,
          }}
        >
          Author slides
          <br />
          <span
            style={{
              background: `linear-gradient(90deg, ${palette.accentSoft}, var(--osd-accent), ${palette.accentSoft})`,
              backgroundSize: '200% auto',
              WebkitBackgroundClip: 'text',
              backgroundClip: 'text',
              color: 'transparent',
              animation: 'osc-shimmer 3.5s linear infinite',
            }}
          >
            with your agent.
          </span>
        </h1>
        <p
          className="osc-fadeUp"
          style={{
            animationDelay: '0.4s',
            marginTop: 40,
            fontSize: 'var(--osd-size-body)',
            color: palette.textSoft,
            lineHeight: 1.45,
            maxWidth: 980,
          }}
        >
          React-powered slides on a 1920×1080 canvas — designed for AI-assisted authoring,
          visual editing, and instant export.
        </p>
      </div>

      {/* Bottom tags */}
      <div
        className="osc-fadeUp"
        style={{
          animationDelay: '0.6s',
          display: 'flex',
          gap: 16,
          flexWrap: 'wrap',
        }}
      >
        {['React + TypeScript', 'Agent-native', '1920×1080 canvas', 'HTML / PDF export'].map(
          (tag) => (
            <span
              key={tag}
              style={{
                fontFamily: font.mono,
                fontSize: 18,
                color: palette.muted,
                border: `1px solid ${palette.border}`,
                padding: '8px 18px',
                borderRadius: 999,
                background: palette.surface,
              }}
            >
              {tag}
            </span>
          ),
        )}
      </div>
    </div>
    <PageFooter />
  </div>
);

// ─── Page 2: Features grid ────────────────────────────────────────────────────
const Features: Page = () => (
  <div style={fill}>
    <Styles />
    <GridBg />
    <div
      style={{
        position: 'absolute',
        inset: 0,
        padding: '100px 120px 100px',
        display: 'flex',
        flexDirection: 'column',
        gap: 48,
      }}
    >
      <div>
        <Eyebrow>核心功能</Eyebrow>
        <h2
          className="osc-fadeUp"
          style={{
            animationDelay: '0.15s',
            fontFamily: 'var(--osd-font-display)',
            fontSize: 88,
            fontWeight: 800,
            letterSpacing: '-0.035em',
            lineHeight: 1.05,
            margin: '16px 0 0',
          }}
        >
          Everything you need.
        </h2>
      </div>

      <div
        style={{
          display: 'grid',
          gridTemplateColumns: '1fr 1fr',
          gridTemplateRows: '1fr 1fr',
          gap: 28,
          flex: 1,
          minHeight: 0,
        }}
      >
        <FeatureCard
          icon="⚛️"
          title="Pure React Components"
          description="Every page is a zero-prop React component. No DSL, no constraints — full TypeScript."
          accentColor={palette.accent}
          delay={0.25}
        />
        <FeatureCard
          icon="🤖"
          title="Agent-Native Skills"
          description="Use /create-slide to draft a full deck, /apply-comments to iterate with your AI agent."
          accentColor={palette.accentSoft}
          delay={0.35}
        />
        <FeatureCard
          icon="🎨"
          title="Visual Design Panel"
          description="Click any element, edit palette and typography live. Changes hot-reload instantly."
          accentColor={palette.mint}
          delay={0.45}
        />
        <FeatureCard
          icon="📄"
          title="Static HTML & PDF Export"
          description="Ship a self-contained HTML deck or print-ready PDF from a single command."
          accentColor={palette.amber}
          delay={0.55}
        />
      </div>
    </div>
    <PageFooter />
  </div>
);

// ─── Page 3: Get started ──────────────────────────────────────────────────────
const GetStarted: Page = () => (
  <div style={fill}>
    <Styles />
    <GridBg />
    {/* Bottom glow */}
    <div
      style={{
        position: 'absolute',
        bottom: 0,
        left: '50%',
        transform: 'translateX(-50%)',
        width: 1200,
        height: 400,
        background: `radial-gradient(ellipse, ${palette.accent}18 0%, transparent 70%)`,
        pointerEvents: 'none',
      }}
    />
    <div
      style={{
        position: 'absolute',
        inset: 0,
        padding: '100px 140px 120px',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
      }}
    >
      <div>
        <Eyebrow>快速開始</Eyebrow>
        <h2
          className="osc-fadeUp"
          style={{
            animationDelay: '0.15s',
            fontFamily: 'var(--osd-font-display)',
            fontSize: 108,
            fontWeight: 800,
            letterSpacing: '-0.04em',
            lineHeight: 1.0,
            margin: '16px 0 0',
          }}
        >
          Up in{' '}
          <span
            style={{
              background: `linear-gradient(90deg, ${palette.accentSoft}, var(--osd-accent))`,
              WebkitBackgroundClip: 'text',
              backgroundClip: 'text',
              color: 'transparent',
            }}
          >
            3 commands.
          </span>
        </h2>
        <p
          className="osc-fadeUp"
          style={{
            animationDelay: '0.3s',
            marginTop: 28,
            fontSize: 36,
            color: palette.textSoft,
            lineHeight: 1.45,
            maxWidth: 1200,
          }}
        >
          Scaffold, install, and start the dev server. Then open Claude Code and type{' '}
          <span
            style={{
              fontFamily: font.mono,
              color: palette.accentSoft,
              background: `${palette.accent}18`,
              border: `1px solid ${palette.accent}40`,
              padding: '2px 12px',
              borderRadius: 6,
            }}
          >
            /create-slide
          </span>
          .
        </p>
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: 18 }}>
        <CommandPill
          step="01"
          command="npx @open-slide/cli init my-slide"
          label="Scaffold project"
          color={palette.text}
          delay={0.45}
        />
        <CommandPill
          step="02"
          command="cd my-slide && pnpm install"
          label="Install deps"
          color={palette.textSoft}
          delay={0.6}
        />
        <CommandPill
          step="03"
          command="pnpm dev"
          label="Launch dev server"
          color={palette.mint}
          delay={0.75}
        />
      </div>
    </div>
    <PageFooter />
  </div>
);

// ─── Transition ───────────────────────────────────────────────────────────────
export const transition: SlideTransition = {
  duration: 220,
  exit: {
    duration: 150,
    easing: 'cubic-bezier(0.4, 0, 1, 1)',
    keyframes: [
      { opacity: 1, transform: 'translateY(0)' },
      { opacity: 0, transform: 'translateY(-5px)' },
    ],
  },
  enter: {
    duration: 220,
    delay: 80,
    easing: 'cubic-bezier(0, 0, 0.2, 1)',
    keyframes: [
      { opacity: 0, transform: 'translateY(8px)' },
      { opacity: 1, transform: 'translateY(0)' },
    ],
  },
};

export const meta: SlideMeta = {
  title: 'open-slide showcase',
  createdAt: '2026-06-10T05:48:47.579Z',
};

export default [Cover, Features, GetStarted] satisfies Page[];
