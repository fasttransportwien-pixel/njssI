/**
 * Subtle ambient background pattern for sections – grid + soft gold/navy glow.
 * Sits behind the content with low opacity for "premium depth" without being loud.
 */
export function AmbientBackground() {
  return (
    <>
      <div aria-hidden="true" className="hero-grid pointer-events-none absolute inset-0 -z-10 opacity-60" />
      <div aria-hidden="true" className="hero-glow pointer-events-none absolute inset-0 -z-10" />
    </>
  );
}
