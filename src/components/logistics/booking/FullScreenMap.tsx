// FullScreenMapView.tsx
import { XMarkIcon } from "@heroicons/react/24/outline";
// import { Dialog } from "@headlessui/react";
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
    <Modal
      isOpen={true}
      onClose={onClose}
      className="relative z-50 w-full h-full max-w-7xl"
    >
      <div className="fixed inset-0 bg-black/30" aria-hidden="true" />
      <div className="fixed inset-0 flex items-center justify-center p-4">
        <div className="relative h-full bg-white rounded-lg overflow-hidden">
          <button
            onClick={onClose}
            className="absolute top-4 right-4 z-50 bg-white p-2 rounded-full shadow-lg hover:bg-gray-100"
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
            hideNavbar={true}
            hideDeliveryInfo={true}
          />
        </div>
      </div>
    </Modal>
  );
};

export default FullScreenMapView;
