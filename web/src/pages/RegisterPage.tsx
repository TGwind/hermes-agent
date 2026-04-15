import { useMemo, useState } from "react";
import { ArrowRight, Bot, Orbit, ShieldCheck } from "lucide-react";
import { Link } from "react-router-dom";
import { AuthShell } from "@/components/auth/AuthShell";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useI18n } from "@/i18n";
import { cn } from "@/lib/utils";

interface RegisterFormState {
  fullName: string;
  email: string;
  workspace: string;
  password: string;
  confirmPassword: string;
  agreeToTerms: boolean;
}

type RegisterFormErrors = Partial<Record<Exclude<keyof RegisterFormState, "agreeToTerms">, string>> & {
  agreeToTerms?: string;
};

function wait(ms: number) {
  return new Promise((resolve) => window.setTimeout(resolve, ms));
}

export default function RegisterPage() {
  const { t } = useI18n();
  const [form, setForm] = useState<RegisterFormState>({
    fullName: "",
    email: "",
    workspace: "",
    password: "",
    confirmPassword: "",
    agreeToTerms: false,
  });
  const [errors, setErrors] = useState<RegisterFormErrors>({});
  const [submitting, setSubmitting] = useState(false);
  const [notice, setNotice] = useState<string | null>(null);

  const highlights = useMemo(
    () => [
      {
        icon: ShieldCheck,
        title: t.auth.highlights.secureTitle,
        description: t.auth.highlights.secureDescription,
      },
      {
        icon: Orbit,
        title: t.auth.highlights.orchestrationTitle,
        description: t.auth.highlights.orchestrationDescription,
      },
      {
        icon: Bot,
        title: t.auth.highlights.auditTitle,
        description: t.auth.highlights.auditDescription,
      },
    ],
    [t],
  );

  const stats = useMemo(
    () => [
      { label: t.auth.stats.responseLabel, value: "92ms" },
      { label: t.auth.stats.sessionsLabel, value: "18.4k" },
      { label: t.auth.stats.uptimeLabel, value: "99.98%" },
    ],
    [t],
  );

  const validate = () => {
    const nextErrors: RegisterFormErrors = {};

    if (!form.fullName.trim()) {
      nextErrors.fullName = t.auth.validation.fullNameRequired;
    }

    if (!form.email.trim()) {
      nextErrors.email = t.auth.validation.emailRequired;
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email.trim())) {
      nextErrors.email = t.auth.validation.emailInvalid;
    }

    if (!form.workspace.trim()) {
      nextErrors.workspace = t.auth.validation.workspaceRequired;
    }

    if (!form.password) {
      nextErrors.password = t.auth.validation.passwordRequired;
    } else if (form.password.length < 8) {
      nextErrors.password = t.auth.validation.passwordMin;
    }

    if (!form.confirmPassword) {
      nextErrors.confirmPassword = t.auth.validation.confirmPasswordRequired;
    } else if (form.confirmPassword !== form.password) {
      nextErrors.confirmPassword = t.auth.validation.passwordMismatch;
    }

    if (!form.agreeToTerms) {
      nextErrors.agreeToTerms = t.auth.validation.agreeToTermsRequired;
    }

    return nextErrors;
  };

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const nextErrors = validate();
    setErrors(nextErrors);
    setNotice(null);

    if (Object.keys(nextErrors).length > 0) return;

    setSubmitting(true);
    await wait(900);
    setSubmitting(false);
    setNotice(t.auth.scaffoldNotice);
  }

  return (
    <AuthShell
      badge={t.auth.badge}
      eyebrow={t.auth.eyebrow}
      title={t.auth.title}
      description={t.auth.description}
      highlights={highlights}
      stats={stats}
      legal={t.auth.legal}
    >
      <Card className="border-border bg-card/85 shadow-[0_24px_80px_rgba(0,0,0,0.32)] backdrop-blur-sm">
        <CardHeader className="space-y-3 border-border px-6 py-6 sm:px-7">
          <div className="space-y-2">
            <CardTitle className="text-lg sm:text-xl">{t.auth.register.title}</CardTitle>
            <CardDescription className="max-w-sm text-sm leading-6 text-foreground/72">
              {t.auth.register.subtitle}
            </CardDescription>
          </div>

          <div className="border border-border bg-background/45 p-3 text-xs leading-5 text-foreground/70">
            {t.auth.register.helper}
          </div>
        </CardHeader>

        <CardContent className="space-y-5 px-6 pb-6 pt-5 sm:px-7">
          <form className="space-y-4" onSubmit={handleSubmit} noValidate>
            <div className="grid gap-4 sm:grid-cols-2">
              <div className="space-y-2 sm:col-span-2">
                <Label htmlFor="register-name">{t.auth.register.fullNameLabel}</Label>
                <Input
                  id="register-name"
                  autoComplete="name"
                  placeholder={t.auth.register.fullNamePlaceholder}
                  value={form.fullName}
                  onChange={(event) => setForm((current) => ({ ...current, fullName: event.target.value }))}
                  aria-invalid={Boolean(errors.fullName)}
                  className={cn(errors.fullName && "border-destructive/60 focus-visible:ring-destructive/30")}
                />
                {errors.fullName && <p className="text-xs text-destructive">{errors.fullName}</p>}
              </div>

              <div className="space-y-2 sm:col-span-2">
                <Label htmlFor="register-email">{t.auth.register.emailLabel}</Label>
                <Input
                  id="register-email"
                  type="email"
                  autoComplete="email"
                  placeholder={t.auth.register.emailPlaceholder}
                  value={form.email}
                  onChange={(event) => setForm((current) => ({ ...current, email: event.target.value }))}
                  aria-invalid={Boolean(errors.email)}
                  className={cn(errors.email && "border-destructive/60 focus-visible:ring-destructive/30")}
                />
                {errors.email && <p className="text-xs text-destructive">{errors.email}</p>}
              </div>

              <div className="space-y-2 sm:col-span-2">
                <Label htmlFor="register-workspace">{t.auth.register.workspaceLabel}</Label>
                <Input
                  id="register-workspace"
                  autoComplete="organization"
                  placeholder={t.auth.register.workspacePlaceholder}
                  value={form.workspace}
                  onChange={(event) => setForm((current) => ({ ...current, workspace: event.target.value }))}
                  aria-invalid={Boolean(errors.workspace)}
                  className={cn(errors.workspace && "border-destructive/60 focus-visible:ring-destructive/30")}
                />
                {errors.workspace && <p className="text-xs text-destructive">{errors.workspace}</p>}
              </div>

              <div className="space-y-2 sm:col-span-2">
                <Label htmlFor="register-password">{t.auth.register.passwordLabel}</Label>
                <Input
                  id="register-password"
                  type="password"
                  autoComplete="new-password"
                  placeholder={t.auth.register.passwordPlaceholder}
                  value={form.password}
                  onChange={(event) => setForm((current) => ({ ...current, password: event.target.value }))}
                  aria-invalid={Boolean(errors.password)}
                  className={cn(errors.password && "border-destructive/60 focus-visible:ring-destructive/30")}
                />
                {errors.password && <p className="text-xs text-destructive">{errors.password}</p>}
              </div>

              <div className="space-y-2 sm:col-span-2">
                <Label htmlFor="register-confirm">{t.auth.register.confirmPasswordLabel}</Label>
                <Input
                  id="register-confirm"
                  type="password"
                  autoComplete="new-password"
                  placeholder={t.auth.register.confirmPasswordPlaceholder}
                  value={form.confirmPassword}
                  onChange={(event) => setForm((current) => ({ ...current, confirmPassword: event.target.value }))}
                  aria-invalid={Boolean(errors.confirmPassword)}
                  className={cn(errors.confirmPassword && "border-destructive/60 focus-visible:ring-destructive/30")}
                />
                {errors.confirmPassword && <p className="text-xs text-destructive">{errors.confirmPassword}</p>}
              </div>

              <div className="space-y-2 sm:col-span-2">
                <label className="flex items-start gap-3 border border-border bg-background/30 px-3 py-3 text-sm leading-6 text-foreground/72">
                  <input
                    checked={form.agreeToTerms}
                    className="mt-1 h-4 w-4 border border-border bg-background accent-foreground"
                    onChange={(event) => setForm((current) => ({ ...current, agreeToTerms: event.target.checked }))}
                    type="checkbox"
                  />
                  <span>{t.auth.register.agreeToTerms}</span>
                </label>
                {errors.agreeToTerms && <p className="text-xs text-destructive">{errors.agreeToTerms}</p>}
              </div>

              <div className="sm:col-span-2">
                <Button className="h-11 w-full justify-between px-4 text-[0.72rem]" disabled={submitting} type="submit">
                  <span>{submitting ? t.auth.register.submitting : t.auth.register.submit}</span>
                  <ArrowRight className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </form>

          {notice && (
            <div className="border border-warning/40 bg-warning/10 p-3 text-sm leading-6 text-foreground/85">
              {notice}
            </div>
          )}

          <div className="flex items-center justify-between gap-4 border-t border-border pt-4 text-sm text-muted-foreground">
            <span>{t.auth.register.switchPrompt}</span>
            <Link className="font-display uppercase tracking-[0.12em] text-foreground transition-colors hover:text-foreground/80" to="/login">
              {t.auth.register.switchAction}
            </Link>
          </div>
        </CardContent>
      </Card>
    </AuthShell>
  );
}
