declare module '@mapbox/mapbox-gl-geocoder' {
  import mapboxgl from 'mapbox-gl';
  
  export default class MapboxGeocoder {
    constructor(options: {
      accessToken: string;
      mapboxgl: typeof mapboxgl;
      marker: boolean;
      placeholder: string;
      localGeocoder?: (query: string) => any[];
      [key: string]: any;
    });
    
    on(type: string, listener: (event: any) => void): this;
    onAdd(map: mapboxgl.Map): HTMLElement;
    onRemove(): void;
  }
}

interface ShipmentCoordinates {
  pickup: [number, number];
  destination: [number, number];
}

interface ShipmentDetails {
  id: string;
  status: string;
  pickup: string;
  destination: string;
  customerName: string;
  rate: string;
  weight: string;
}