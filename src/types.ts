export interface TravelRecord {
  user_id: string;
  trip_title: string;
  country: string;
  departure_date: string; // ISO format date string
  return_date: string; // ISO format date string
  data: {
    reference_number?: string; // Optional
    travel_purpose?: string; // Optional, e.g., Business / Holiday / Other
  }
}
