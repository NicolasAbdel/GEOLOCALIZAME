export interface HistoryItem {
  id: string;
  timestamp: string;
  locationName: string;
  address: string;
  isLive?: boolean;
  lat: number;
  lng: number;
}

export interface MapMarkerData {
  id: string;
  top: string;
  left: string;
  color: string;
  label: string;
  isCurrent?: boolean;
}