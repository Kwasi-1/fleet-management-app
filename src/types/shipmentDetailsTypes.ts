export interface ShipmentProgress {
  title: string;
  location?: string;
  address?: string;
  time: string;
  iconColor: string;
  status: {
    label?: string;
    color?: string;
    bgColor?: string;
  } | null;
}

export interface Comment {
  user: string;
  message: string;
  timestamp: string;
}

export interface Document {
  name: string;
  date: string;
}

export interface Shipment {
  id: string;
  order: string;
  pickup: string;
  destination: string;
  pickupCoordinates: [number, number];
  destinationCoordinates: [number, number];
  date: string;
  status: string;
  rate: string;
  distance: string;
  customerName: string;
  weight: string;
  reference: string;
  primaryReference: string;
  lastKnownPosition: {
    location: string;
    timestamp: string;
  };
  eta: {
    location: string;
    timestamp: string;
  };
  progress: ShipmentProgress[];
  businessUnit?: string;
  orderType?: string;
  bookingNumber?: string;
  billOfLading?: string;
  modeType?: string;
  container?: string;
  carrierName?: string;
  carrierID?: string;
  comments?: Comment[];
  documents?: Document[];
}
