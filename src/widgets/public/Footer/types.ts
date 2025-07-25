import { ReactNode } from 'react';

export interface FooterLink {
  label: string;
  href: string;
}

export interface FooterProps {
  /** Copyright text, e.g. "© 2025 Event Name" */
  copyright: string;
  /** Array of links to display in the footer */
  links?: FooterLink[];
  /** Optional additional info (e.g. address, contact, etc.) */
  extraInfo?: ReactNode;
}
