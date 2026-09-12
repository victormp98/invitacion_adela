export interface RSVPRecord {
  id: string;
  name: string;
  attending: boolean;
  guestsCount: number;
  message?: string;
  phone?: string;
  timestamp: string;
}

export interface ItineraryItem {
  time: string;
  title: string;
  description: string;
  icon: string;
  highlight?: boolean;
}
