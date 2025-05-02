import { useState } from "react";
import Textarea from "@/components/common/Textarea";

interface ProductDescriptionProps {
  description: string;
}

export default function ProductDescription({
  description,
}: ProductDescriptionProps) {
  const [descriptionText, setDescriptionText] = useState(description);

  return (
    <div className="mb-6">
      <Textarea
        label="Product Description"
        className="w-full p-3 borde rounded-md min-h-24 focus:outline-none focus:ring-2 focus:ring-blue-500"
        value={descriptionText}
        onChange={(e) => setDescriptionText(e.target.value)}
      />
    </div>
  );
}
