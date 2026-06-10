import type { DesignSystem, Page, SlideMeta, SlideTransition } from '@open-slide/core';
import { useSlidePageNumber } from '@open-slide/core';

export const design: DesignSystem = {
  palette: {
    bg: '#000000',
    text: '#e8f0fa',
    accent: '#1a8cff',
  },
  fonts: {
    display: 'Georgia, "Times New Roman", serif',
    body: '"Helvetica Neue", Helvetica, Arial, sans-serif',
  },
  typeScale: {
    hero: 98,
    body: 42,
  },
  radius: 22,
};

const palette = {
  bg: design.palette.bg,
  text: design.palette.text,
  accent: design.palette.accent,
  surface: '#0a1628',
  surfaceHi: '#0f1f38',
  border: 'rgba(255,255,255,0.07)',
  borderBright: 'rgba(26,140,255,0.3)',
  muted: '#5a7494',
  textSoft: '#9ab0cc',
  accentSoft: '#5ab0ff',
  teal: '#00c8a0',
  gold: '#e0b84a',
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

const styles = `
  @keyframes tipc-fadeUp {
    from { opacity: 0; transform: translateY(18px); }
    to   { opacity: 1; transform: translateY(0); }
  }
  @keyframes tipc-fadeIn {
    from { opacity: 0; }
    to   { opacity: 1; }
  }
  @keyframes tipc-wave {
    0%, 100% { transform: scaleY(1) translateY(0); }
    50%      { transform: scaleY(1.08) translateY(-4px); }
  }
  @keyframes tipc-cardIn {
    from { opacity: 0; transform: translateY(20px); }
    to   { opacity: 1; transform: translateY(0); }
  }
  .tipc-fadeUp { opacity: 0; animation: tipc-fadeUp 0.8s cubic-bezier(0.2,0.8,0.2,1) forwards; }
  .tipc-fadeIn { opacity: 0; animation: tipc-fadeIn 1s ease forwards; }
  .tipc-cardIn { opacity: 0; animation: tipc-cardIn 0.7s cubic-bezier(0.2,0.8,0.2,1) forwards; }
`;

const Styles = () => <style>{styles}</style>;

const WaveBg = () => (
  <div
    style={{
      position: 'absolute',
      bottom: 0,
      left: 0,
      right: 0,
      height: 320,
      background: `linear-gradient(180deg, transparent 0%, ${palette.accent}08 60%, ${palette.accent}18 100%)`,
      maskImage: 'linear-gradient(180deg, transparent 0%, black 100%)',
      WebkitMaskImage: 'linear-gradient(180deg, transparent 0%, black 100%)',
      pointerEvents: 'none',
      animation: 'tipc-wave 6s ease-in-out infinite',
    }}
  />
);

const GridBg = () => (
  <div
    style={{
      position: 'absolute',
      inset: 0,
      backgroundImage:
        'linear-gradient(rgba(26,140,255,0.03) 1px, transparent 1px), linear-gradient(90deg, rgba(26,140,255,0.03) 1px, transparent 1px)',
      backgroundSize: '72px 72px',
      maskImage: 'radial-gradient(ellipse 130% 80% at 50% 40%, rgba(0,0,0,0.7) 0%, rgba(0,0,0,0) 70%)',
      WebkitMaskImage: 'radial-gradient(ellipse 130% 80% at 50% 40%, rgba(0,0,0,0.7) 0%, rgba(0,0,0,0) 70%)',
      pointerEvents: 'none',
    }}
  />
);

const PageFooter = () => {
  const { current, total } = useSlidePageNumber();
  return (
    <div
      style={{
        position: 'absolute',
        bottom: 48,
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

// ─── Port Card ────────────────────────────────────────────────────────────────
const PortCard = ({
  name,
  en,
  icon,
  delay,
}: {
  name: string;
  en: string;
  icon: string;
  delay: number;
}) => (
  <div
    className="tipc-cardIn"
    style={{
      animationDelay: `${delay}s`,
      background: palette.surface,
      border: `1px solid ${palette.border}`,
      borderRadius: 'var(--osd-radius)',
      padding: '28px 32px',
      display: 'flex',
      alignItems: 'center',
      gap: 20,
      position: 'relative',
      overflow: 'hidden',
    }}
  >
    <div
      style={{
        position: 'absolute',
        left: 0,
        top: 0,
        bottom: 0,
        width: 3,
        background: `linear-gradient(180deg, ${palette.accent}, ${palette.teal})`,
        borderRadius: '3px 0 0 3px',
      }}
    />
    <span style={{ fontSize: 32 }}>{icon}</span>
    <div>
      <div
        style={{
          fontFamily: 'var(--osd-font-display)',
          fontSize: 28,
          fontWeight: 700,
          color: palette.text,
          letterSpacing: '-0.01em',
        }}
      >
        {name}
      </div>
      <div
        style={{
          fontFamily: font.mono,
          fontSize: 16,
          color: palette.muted,
          marginTop: 4,
          letterSpacing: '0.04em',
        }}
      >
        {en}
      </div>
    </div>
  </div>
);

// ─── Stat Badge ───────────────────────────────────────────────────────────────
const StatBadge = ({
  value,
  label,
  delay,
}: {
  value: string;
  label: string;
  delay: number;
}) => (
  <div
    className="tipc-fadeUp"
    style={{
      animationDelay: `${delay}s`,
      display: 'flex',
      flexDirection: 'column',
      gap: 4,
    }}
  >
    <div
      style={{
        fontFamily: 'var(--osd-font-display)',
        fontSize: 52,
        fontWeight: 800,
        letterSpacing: '-0.03em',
        color: palette.accentSoft,
        lineHeight: 1,
      }}
    >
      {value}
    </div>
    <div
      style={{
        fontFamily: font.sans,
        fontSize: 20,
        color: palette.muted,
        letterSpacing: '-0.01em',
      }}
    >
      {label}
    </div>
  </div>
);

// ─── Page 1: Cover ────────────────────────────────────────────────────────────
const Cover: Page = () => (
  <div style={fill}>
    <Styles />
    <GridBg />
    <WaveBg />
    {/* Glow */}
    <div
      style={{
        position: 'absolute',
        top: '20%',
        left: '50%',
        transform: 'translateX(-50%)',
        width: 1000,
        height: 500,
        background: `radial-gradient(ellipse, ${palette.accent}1a 0%, transparent 65%)`,
        pointerEvents: 'none',
      }}
    />

    <div
      style={{
        position: 'absolute',
        inset: 0,
        padding: '96px 140px',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
      }}
    >
      {/* Top */}
      <div
        className="tipc-fadeIn"
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
        }}
      >
        <div
          style={{
            fontFamily: font.mono,
            fontSize: 18,
            letterSpacing: '0.22em',
            textTransform: 'uppercase',
            color: palette.muted,
          }}
        >
          Taiwan International Ports Corporation
        </div>
        <div
          style={{
            fontFamily: font.mono,
            fontSize: 16,
            color: palette.muted,
            border: `1px solid ${palette.border}`,
            padding: '7px 16px',
            borderRadius: 999,
          }}
        >
          成立於 2012
        </div>
      </div>

      {/* Hero */}
      <div>
        <h1
          className="tipc-fadeUp"
          style={{
            animationDelay: '0.15s',
            fontFamily: 'var(--osd-font-display)',
            fontSize: 'var(--osd-size-hero)',
            fontWeight: 900,
            lineHeight: 0.95,
            letterSpacing: '-0.045em',
            margin: 0,
          }}
        >
          台灣港務
          <br />
          <span
            style={{
              background: `linear-gradient(90deg, var(--osd-accent), ${palette.teal})`,
              WebkitBackgroundClip: 'text',
              backgroundClip: 'text',
              color: 'transparent',
            }}
          >
            公司
          </span>
        </h1>
        <p
          className="tipc-fadeUp"
          style={{ animationDelay: '0.35s', marginTop: 36, fontSize: '46px', color: palette.textSoft, lineHeight: 1.5, maxWidth: 1100, fontStyle: 'italic' }}
        >
          整合台灣六大國際商港，提供港埠經營、航運服務與物流管理，
          連結台灣與全球海運網絡。
        </p>
      </div>

      {/* Stats */}
      <div
        style={{
          display: 'flex',
          gap: 80,
          paddingTop: 8,
          borderTop: `1px solid ${palette.border}`,
        }}
      >
        <StatBadge value="6" label="管轄國際商港" delay={0.5} />
        <StatBadge value="16,000+" label="員工人數" delay={0.62} />
        <StatBadge value="全球連結" label="海運航線覆蓋" delay={0.74} />
        <StatBadge value="TIPC" label="股票代號（國營）" delay={0.86} />
      </div>
    </div>
    <PageFooter />
  </div>
);

// ─── Page 2: Ports & Business ─────────────────────────────────────────────────
const Ports: Page = () => (
  <div style={fill}>
    <Styles />
    <GridBg />
    <div
      style={{
        position: 'absolute',
        inset: 0,
        padding: '96px 120px 96px',
        display: 'flex',
        flexDirection: 'column',
        gap: 40,
      }}
    >
      {/* Header */}
      <div>
        <div
          className="tipc-fadeUp"
          style={{
            fontFamily: font.mono,
            fontSize: 18,
            letterSpacing: '0.2em',
            textTransform: 'uppercase',
            color: palette.muted,
          }}
        >
          核心業務
        </div>
        <h2
          className="tipc-fadeUp"
          style={{
            animationDelay: '0.12s',
            fontFamily: 'var(--osd-font-display)',
            fontSize: 84,
            fontWeight: 800,
            letterSpacing: '-0.035em',
            lineHeight: 1.05,
            margin: '14px 0 0',
          }}
        >
          六大港口，串聯世界。
        </h2>
      </div>

      {/* Content: 2 columns */}
      <div
        style={{
          flex: 1,
          display: 'grid',
          gridTemplateColumns: '1.1fr 1fr',
          gap: 36,
          minHeight: 0,
        }}
      >
        {/* LEFT: Port grid 3x2 */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: '1fr 1fr',
            gridTemplateRows: 'repeat(3, 1fr)',
            gap: 16,
          }}
        >
          <PortCard name="基隆港" en="Keelung Port" icon="⚓" delay={0.2} />
          <PortCard name="臺中港" en="Taichung Port" icon="🏭" delay={0.28} />
          <PortCard name="高雄港" en="Kaohsiung Port" icon="🚢" delay={0.36} />
          <PortCard name="花蓮港" en="Hualien Port" icon="🏔️" delay={0.44} />
          <PortCard name="布袋港" en="Budai Port" icon="🌊" delay={0.52} />
          <PortCard name="安平港" en="Anping Port" icon="⛵" delay={0.6} />
        </div>

        {/* RIGHT: Business items */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
          {[
            {
              icon: '🏗️',
              title: '港埠經營',
              desc: '碼頭租賃、裝卸作業、倉儲服務，提供完整港埠基礎設施管理。',
              color: palette.accent,
            },
            {
              icon: '🚛',
              title: '物流服務',
              desc: '整合港區物流園區，連接海、陸、空多式聯運，提升供應鏈效率。',
              color: palette.teal,
            },
            {
              icon: '📡',
              title: '智慧港口',
              desc: '導入 IoT 感測、AI 調度與數位化管理，推動港口現代化轉型。',
              color: palette.gold,
            },
          ].map((item, i) => (
            <div
              key={item.title}
              className="tipc-cardIn"
              style={{
                animationDelay: `${0.3 + i * 0.12}s`,
                background: palette.surface,
                border: `1px solid ${palette.border}`,
                borderRadius: 'var(--osd-radius)',
                padding: '24px 28px',
                display: 'flex',
                gap: 20,
                alignItems: 'flex-start',
                flex: 1,
              }}
            >
              <div
                style={{
                  width: 44,
                  height: 44,
                  borderRadius: 10,
                  background: `${item.color}18`,
                  border: `1px solid ${item.color}40`,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: 22,
                  flexShrink: 0,
                }}
              >
                {item.icon}
              </div>
              <div>
                <div
                  style={{
                    fontFamily: 'var(--osd-font-display)',
                    fontSize: 26,
                    fontWeight: 700,
                    color: palette.text,
                    marginBottom: 8,
                  }}
                >
                  {item.title}
                </div>
                <div
                  style={{
                    fontSize: 22,
                    color: palette.textSoft,
                    lineHeight: 1.5,
                  }}
                >
                  {item.desc}
                </div>
              </div>
            </div>
          ))}
        </div>
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

// ─── Page 3: 修改測試頁面 ─────────────────────────────────────────────────────
const TestPage: Page = () => (
  <div style={fill}>
    <Styles />
    <GridBg />
    <div
      style={{
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: 800,
        height: 400,
        background: `radial-gradient(ellipse, ${palette.teal}1a 0%, transparent 65%)`,
        pointerEvents: 'none',
      }}
    />
    <div
      style={{
        position: 'absolute',
        inset: 0,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        gap: 32,
      }}
    >
      <div
        className="tipc-fadeUp"
        style={{
          fontFamily: font.mono,
          fontSize: 20,
          letterSpacing: '0.2em',
          textTransform: 'uppercase',
          color: palette.muted,
        }}
      >
        Vercel 自動部署測試
      </div>
      <h2
        className="tipc-fadeUp"
        style={{
          animationDelay: '0.15s',
          fontFamily: 'var(--osd-font-display)',
          fontSize: 120,
          fontWeight: 900,
          letterSpacing: '-0.04em',
          lineHeight: 1.0,
          margin: 0,
          color: palette.teal,
          textAlign: 'center',
        }}
      >
        修改測試頁面
      </h2>
      <p
        className="tipc-fadeUp"
        style={{
          animationDelay: '0.3s',
          fontSize: 36,
          color: palette.textSoft,
          textAlign: 'center',
          lineHeight: 1.5,
        }}
      >
        如果你看到這頁，代表 Vercel 自動部署成功 ✅<br />修改測試20:32
      </p>
    </div>
    <PageFooter />
  </div>
);

export const meta: SlideMeta = {
  title: '台灣港務公司 TIPC',
  createdAt: '2026-06-10T06:37:10.579Z',
};

export default [TestPage, Cover, Ports] satisfies Page[];
