import { XMarkIcon } from "@heroicons/react/24/outline";
import MapComponent from "../../landing/MapComponent";
import { Modal } from "@nextui-org/react";

interface FullScreenMapViewProps {
  pickupCoordinates: [number, number];
  destinationCoordinates: [number, number];
  onClose: () => void;
}

const FullScreenMapView = ({
  pickupCoordinates,
  destinationCoordinates,
  onClose,
}: FullScreenMapViewProps) => {
  return (
    <Modal isOpen={true} onClose={onClose} className="relative z-50">
      <div className="fixed inset-0 bg-black/30" aria-hidden="true" />
      <div className="fixed inset-0 flex items-center justify-center p-4">
        <div className="w-full h-full bg-white">
          <div className="relative h-full">
            <button
              onClick={onClose}
              className="absolute top-4 right-4 z-10 bg-white p-2 rounded-full shadow-lg"
            >
              <XMarkIcon className="h-6 w-6 text-gray-600" />
            </button>
            <MapComponent
              initialCenter={pickupCoordinates}
              initialZoom={12}
              showRoute={{
                pickup: pickupCoordinates,
                destination: destinationCoordinates,
              }}
            />
          </div>
        </div>
      </div>
    </Modal>
  );
};

export default FullScreenMapView;
