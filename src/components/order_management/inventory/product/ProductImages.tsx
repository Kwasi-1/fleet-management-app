import { Image } from "lucide-react";
import { useRef, useState } from "react";

interface ProductImagesProps {
  images: string[];
}

export default function ProductImages({ images }: ProductImagesProps) {
  const [selectedImage, setSelectedImage] = useState(0);
  const [imageList, setImageList] = useState<string[]>(images);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleAddImage = () => {
    fileInputRef.current?.click();
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        if (typeof reader.result === "string") {
          setImageList((prev) => [...prev, reader.result as string]);
        }
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div>
      <div className="grid grid-cols-4 gap-4">
        {imageList.map((image, index) => (
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
          className="rounded-lg border-2 border-dashed bg-gray-200/30 border-gray-300 dark:border-[#e0e6e930] flex flex-col items-center justify-center p-4 cursor-pointer hover:bg-gray-50 dark:hover:bg-accent transition-colors"
          onClick={handleAddImage}
        >
          <Image className="w-6 h-6 text-gray-400 mb-2" />
          <p className="text-xs text-gray-500 text-center">Add more images</p>
        </div>
      </div>

      {/* Hidden file input */}
      <input
        type="file"
        accept="image/*"
        ref={fileInputRef}
        className="hidden"
        onChange={handleFileChange}
        title="Upload an image"
      />
    </div>
  );
}
