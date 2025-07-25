export interface OrganizerInfoProps {
  /** Logo image URL or static import */
  logo: string;
  /** Organizer or provider name */
  name: string;
  /** Short description of the organizer */
  description: string;
  /** Optional website URL */
  website?: string;
  /** Optional array of social links (label + url) */
  socials?: Array<{
    label: string;
    url: string;
    icon?: React.ReactNode; // Optional: for custom icon rendering
  }>;
}
