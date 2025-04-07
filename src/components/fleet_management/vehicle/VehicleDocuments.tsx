import { useState } from "react";

// Define a type for the match items
type MatchItem = {
  title: string;
  image: string;
};

// Define the matchData with the MatchItem type
const matchData: MatchItem[] = [
  {
    title: "Road Worthy",
    image: "https://pbs.twimg.com/media/DSnT4RDW4AAYYX2.jpg:large",
  },
  {
    title: "Insurance Papers",
    image:
      "https://www.adomonline.com/wp-content/uploads/2020/01/6359862497128_9820446995914-Copy-696x464.jpg",
  },
  {
    title: "Ownership Papers",
    image:
      "https://www.sellmycar.ca/wp-content/uploads/2023/03/car-transfer-application.jpg",
  },
];

const VehicleDocuments: React.FC = () => {
  const [selectedImage, setSelectedImage] = useState<string | null>(null);

  return (
    <div className="bg-gray-200/30 p-4 rounded-xl border border-[#e0e6e990] text-gray-700">
      {/* Header */}
      <div className="flex justify-between items-center border-b border-[#e0e6e9] pb-2">
        <h3 className="text-[17px] font-semibold">Documents</h3>
        <div className="text-xs text-gray-400">{matchData.length} RESULTS</div>
      </div>

      {/* Scrollable Container for Cards */}
      <div className="mt-4 flex space-x-4 overflow-x-auto scrollbar-hide p-2">
        {matchData.map((match, index) => (
          <div
            key={index}
            className="p-4 rounded-lg min-w-[320px] border border-gray-200"
          >
            <h3 className="text-sm font-semibold pb-2">{match.title}</h3>

            {/* Clickable Image */}
            <div
              className="rounded-lg w-full h-32 overflow-hidden cursor-pointer"
              onClick={() => setSelectedImage(match.image)}
            >
              <img
                src={match.image}
                alt={match.title}
                className="w-full h-full object-cover rounded-lg transition hover:scale-105 duration-300"
                loading="lazy"
              />
            </div>
          </div>
        ))}
      </div>

      {/* Full-Screen Image Modal */}
      {selectedImage && (
        <div
          className="fixed inset-0 bg-black/80 flex items-center justify-center z-50"
          onClick={() => setSelectedImage(null)}
        >
          <div className="relative max-w-3xl w-full p-4">
            <img
              src={selectedImage}
              alt="Full Screen"
              className="w-full h-auto max-h-[85vh] object-contain rounded-lg"
            />
            <button
              className="fixed top-4 right-4 text-white text-lg font-bold bg-gray-600 px-3 py-1 rounded-full"
              onClick={() => setSelectedImage(null)}
            >
              ✕
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default VehicleDocuments;
