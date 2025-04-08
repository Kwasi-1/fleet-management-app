// export interface ShipmentProgress {
//   title: string;
//   location?: string;
//   address?: string;
//   time: string;
//   iconColor: string;
//   status: {
//     label?: string;
//     color?: string;
//     bgColor?: string;
//   } | null;
// }

// export interface LastKnownPosition {
//   location: string;
//   timestamp: string;
// }

// export interface ETA {
//   location: string;
//   timestamp: string;
// }

export interface Shipment {
  id: string;
  order: string;
  pickup: string;
  destination: string;
  pickupCoordinates: [number, number];
  destinationCoordinates: [number, number];
  date: string;
  status: string;
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
  progress: Array<{
    title: string;
    location?: string;
    address?: string;
    time: string;
    iconColor: string;
    status: {
      label: string;
      color: string;
      bgColor: string;
    } | null;
  }>;
  [key: string]: any; // Add index signature to satisfy TableRow constraint
}
