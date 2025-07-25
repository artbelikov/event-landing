export interface HeadingBlockProps {
  /** Main event title (required) */
  title: string;
  /** Subtitle or tagline (required) */
  subtitle: string;
  /** Optional call-to-action button label */
  ctaLabel?: string;
  /** Optional click handler for CTA button (if button, not link) */
  onCtaClick?: () => void;
  /** Optional href for CTA button (if link) */
  ctaHref?: string;
}
