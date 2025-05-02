import { Image } from "lucide-react";
import { useState } from "react";

interface ProductImagesProps {
  images: string[];
}

export default function ProductImages({ images }: ProductImagesProps) {
  const [selectedImage, setSelectedImage] = useState(0);

  // In a real application, you would handle image uploads here
  const handleAddImage = () => {
    console.log("Add image clicked");
  };

  return (
    <div>
      <div className="grid grid-cols-4 gap-4">
        {images.map((image, index) => (
          <div
            key={index}
            className={`rounded-lg overflow-hidden cursor-pointer transition-all border items-center flex ${
              selectedImage === index ? "ring-2 ring-black" : ""
            }`}
            onClick={() => setSelectedImage(index)}
          >
            <div className="aspect-w-16 aspect-h-9 relative">
              <img
                src={image}
                alt={`Product image ${index + 1}`}
                className="object-cover w-full h-full"
              />
            </div>
          </div>
        ))}

        {/* Add more image button */}
        <div
          className="rounded-lg border-2 border-dashed border-gray-300 flex flex-col items-center justify-center p-4 cursor-pointer hover:bg-gray-50"
          onClick={handleAddImage}
        >
          <Image className="w-6 h-6 text-gray-400 mb-2" />
          <p className="text-xs text-gray-500 text-center">Add more image</p>
          <button className="mt-2 text-blue-500 text-xs">Add Image</button>
        </div>
      </div>
    </div>
  );
}
