export interface AddressMapProps {
  /** The physical address to display */
  address: string;
  /** The embed URL for the map (e.g., Google Maps iframe src) */
  mapEmbedUrl: string;
  /** Optional: title for accessibility */
  title?: string;
}
