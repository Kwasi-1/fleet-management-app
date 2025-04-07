import { useState, useEffect } from "react";
import { Icon } from "@iconify/react";

interface VehicleImageProps {
  make: string;
  model: string;
  year: string | number;
  className?: string; // className is optional
}

interface PixabayResponse {
  hits: { webformatURL: string }[];
}

interface EdmundsResponse {
  photos: { url: string }[];
}

const VehicleImage: React.FC<VehicleImageProps> = ({
  make,
  model,
  year,
  className = "",
}) => {
  const [imageUrl, setImageUrl] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchVehicleImage = async () => {
      try {
        setLoading(true);

        // First try Edmunds API (more accurate but requires API key)
        const edmundsResponse = await fetch(
          `https://api.edmunds.com/api/media/v2/${make}/${model}/${year}/photos?fmt=json&api_key=YOUR_EDMUNDS_API_KEY`
        );

        if (edmundsResponse.ok) {
          const data: EdmundsResponse = await edmundsResponse.json();
          if (data.photos && data.photos.length > 0) {
            setImageUrl(data.photos[0].url);
            return;
          }
        }

        // Fallback to Pixabay API (free, no API key needed for low volume)
        const pixabayResponse = await fetch(
          `https://pixabay.com/api/?key=49651572-825b797d1a4b742bccb0232f3&q=${make}+${model}+car&image_type=photo`
        );

        if (pixabayResponse.ok) {
          const data: PixabayResponse = await pixabayResponse.json();
          if (data.hits && data.hits.length > 0) {
            setImageUrl(data.hits[0].webformatURL);
            return;
          }
        }

        // Final fallback to placeholder
        setImageUrl(null);
      } catch (err) {
        setError("Failed to load vehicle image");
        console.error("Error fetching vehicle image:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchVehicleImage();
  }, [make, model, year]);

  if (loading) {
    return (
      <div
        className={`${className} flex items-center justify-center bg-gray-200`}
      >
        <Icon icon="eos-icons:loading" className="text-2xl text-gray-500" />
      </div>
    );
  }

  if (error) {
    return (
      <div
        className={`${className} flex items-center justify-center bg-gray-200`}
      >
        <Icon icon="mdi:image-off" className="text-2xl text-gray-500" />
      </div>
    );
  }

  return (
    <div className={`${className} overflow-hidden`}>
      {imageUrl ? (
        <img
          src={imageUrl}
          alt={`${year} ${make} ${model}`}
          className="w-full h-full object-cover"
          onError={() => setImageUrl(null)}
        />
      ) : (
        <div className="w-full h-full bg-gray-200 flex items-center justify-center">
          <Icon icon="mdi:car" className="text-3xl text-gray-400" />
        </div>
      )}
    </div>
  );
};

export default VehicleImage;
