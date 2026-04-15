import type { ReactNode } from "react";
import type { LucideIcon } from "lucide-react";
import { Link } from "react-router-dom";

interface AuthHighlight {
  icon: LucideIcon;
  title: string;
  description: string;
}

interface AuthStat {
  label: string;
  value: string;
}

interface AuthShellProps {
  badge: string;
  eyebrow: string;
  title: string;
  description: string;
  highlights: AuthHighlight[];
  stats: AuthStat[];
  legal: string;
  children: ReactNode;
}

export function AuthShell({ badge, eyebrow, title, description, highlights, stats, legal, children }: AuthShellProps) {
  return (
    <div className="relative isolate min-h-screen overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(255,230,203,0.16),transparent_30%),radial-gradient(circle_at_bottom_right,rgba(10,46,46,0.8),transparent_38%)]" />
      <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-foreground/30 to-transparent" />

      <div className="relative mx-auto grid min-h-screen w-full max-w-[1440px] lg:grid-cols-[minmax(0,1.05fr)_minmax(420px,520px)]">
        <section className="hidden border-r border-border/70 bg-background/18 px-8 py-8 backdrop-blur-[2px] lg:flex lg:flex-col lg:justify-between xl:px-12 xl:py-10">
          <div className="space-y-10">
            <div className="flex items-center justify-between gap-4">
              <Link
                className="font-collapse text-lg font-bold tracking-[0.22em] uppercase text-foreground/90 transition-colors hover:text-foreground"
                to="/"
              >
                Hermes Agent
              </Link>
              <span className="border border-border bg-card/60 px-3 py-1 font-display text-[0.62rem] tracking-[0.16em] uppercase text-foreground/70">
                {badge}
              </span>
            </div>

            <div className="max-w-xl space-y-6 pt-6">
              <div className="space-y-3">
                <p className="font-display text-[0.72rem] tracking-[0.22em] uppercase text-foreground/60">{eyebrow}</p>
                <h1 className="max-w-lg font-expanded text-4xl font-bold leading-none tracking-[0.02em] text-foreground blend-lighter xl:text-[3.5rem]">
                  {title}
                </h1>
              </div>

              <p className="max-w-xl text-base leading-7 text-foreground/72 xl:text-lg xl:leading-8">{description}</p>
            </div>

            <div className="grid gap-4 xl:grid-cols-3">
              {stats.map((stat) => (
                <div key={stat.label} className="border border-border bg-card/50 p-4">
                  <div className="font-expanded text-2xl text-foreground">{stat.value}</div>
                  <div className="mt-2 text-xs uppercase tracking-[0.18em] text-foreground/55">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>

          <div className="grid gap-4 xl:grid-cols-3">
            {highlights.map(({ icon: Icon, title: itemTitle, description: itemDescription }) => (
              <div key={itemTitle} className="flex flex-col gap-4 border border-border bg-card/40 p-5">
                <div className="flex h-10 w-10 items-center justify-center border border-border bg-background/60">
                  <Icon className="h-4 w-4 text-foreground" />
                </div>
                <div className="space-y-2">
                  <h2 className="font-display text-sm uppercase tracking-[0.14em] text-foreground">{itemTitle}</h2>
                  <p className="text-sm leading-6 text-foreground/68">{itemDescription}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        <section className="relative flex min-h-screen items-center justify-center px-4 py-8 sm:px-8 lg:px-10 xl:px-14">
          <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(4,28,28,0.52),rgba(4,28,28,0.88))] lg:bg-[linear-gradient(135deg,rgba(4,28,28,0.24),rgba(4,28,28,0.92))]" />

          <div className="relative w-full max-w-[480px] space-y-6">
            <div className="space-y-4 lg:hidden">
              <div className="flex items-center justify-between gap-4">
                <Link
                  className="font-collapse text-base font-bold tracking-[0.22em] uppercase text-foreground/90 transition-colors hover:text-foreground"
                  to="/"
                >
                  Hermes Agent
                </Link>
                <span className="border border-border bg-card/60 px-3 py-1 font-display text-[0.62rem] tracking-[0.16em] uppercase text-foreground/70">
                  {badge}
                </span>
              </div>

              <div className="space-y-3 border border-border bg-card/45 p-5 backdrop-blur-sm">
                <p className="font-display text-[0.72rem] tracking-[0.22em] uppercase text-foreground/60">{eyebrow}</p>
                <h1 className="font-expanded text-3xl leading-none text-foreground blend-lighter">{title}</h1>
                <p className="text-sm leading-6 text-foreground/72">{description}</p>
              </div>
            </div>

            {children}

            <p className="text-center text-xs leading-6 text-foreground/60">{legal}</p>
          </div>
        </section>
      </div>
    </div>
  );
}
