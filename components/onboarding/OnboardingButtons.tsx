import { cn } from "@/lib/utils";

/* ── Gradient "Get started" style button ─────────────────────────────────── */
interface GradientButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  loading?: boolean;
}

export function GradientButton({
  loading,
  className,
  children,
  ...props
}: GradientButtonProps) {
  return (
    <button
      className={cn(
        "sb-btn-gradient cursor-pointer flex w-full items-center justify-center rounded-full py-4 text-base font-semibold text-white",
        "disabled:cursor-not-allowed disabled:opacity-60",
        className,
      )}
      disabled={loading || props.disabled}
      {...props}
    >
      {loading ? (
        <span className="mr-2 inline-block h-4 w-4 animate-spin rounded-full border-2 border-white border-t-transparent" />
      ) : null}
      {children}
    </button>
  );
}

/* ── Dark outlined "Sign in / Next" style button ────────────────────────── */
interface DarkButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  loading?: boolean;
}

export function DarkButton({
  loading,
  className,
  children,
  ...props
}: DarkButtonProps) {
  return (
    <button
      className={cn(
        "sb-btn-dark cursor-pointer flex w-full items-center justify-center rounded-full py-4 text-base font-semibold text-white",
        "disabled:cursor-not-allowed disabled:opacity-60",
        className,
      )}
      disabled={loading || props.disabled}
      {...props}
    >
      {loading ? (
        <span className="mr-2 inline-block h-4 w-4 animate-spin rounded-full border-2 border-white border-t-transparent" />
      ) : null}
      {children}
    </button>
  );
}

/* ── Fixed bottom "Next" button wrapper ─────────────────────────────────── */
export function BottomNextButton({
  loading,
  disabled,
  active,
  onClick,
  children = "Next",
}: {
  loading?: boolean;
  disabled?: boolean;
  active?: boolean;
  onClick?: () => void;
  children?: React.ReactNode;
}) {
  const isActive = active && !disabled;
  return (
    <div className="fixed bottom-0 left-0 right-0 z-30 flex justify-center px-6 pb-8 pt-4">
      <div className="w-full max-w-sm">
        {isActive ? (
          <GradientButton loading={loading} onClick={onClick}>
            {children}
          </GradientButton>
        ) : (
          <DarkButton loading={loading} disabled={disabled} onClick={onClick}>
            {children}
          </DarkButton>
        )}
      </div>
    </div>
  );
}
