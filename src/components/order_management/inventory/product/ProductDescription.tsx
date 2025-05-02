import { useState } from "react";
import {
  Bold,
  Italic,
  Underline,
  Strikethrough,
  AlignLeft,
  List,
  ListOrdered,
  Sparkles,
} from "lucide-react";

interface ProductDescriptionProps {
  description: string;
}

export default function ProductDescription({
  description,
}: ProductDescriptionProps) {
  const [descriptionText, setDescriptionText] = useState(description);

  const handleGenerateWithAI = () => {
    console.log("Generate with AI clicked");
    // This would integrate with an AI service to generate description
  };

  // These buttons would normally trigger rich text editing functionality
  const formatButtons = [
    { icon: <Bold className="w-4 h-4" />, tooltip: "Bold" },
    { icon: <Italic className="w-4 h-4" />, tooltip: "Italic" },
    { icon: <Underline className="w-4 h-4" />, tooltip: "Underline" },
    { icon: <Strikethrough className="w-4 h-4" />, tooltip: "Strikethrough" },
    { icon: <AlignLeft className="w-4 h-4" />, tooltip: "Align" },
    { icon: <List className="w-4 h-4" />, tooltip: "Bullet List" },
    { icon: <ListOrdered className="w-4 h-4" />, tooltip: "Numbered List" },
  ];

  return (
    <div className="p-6">
      <h2 className="text-lg font-medium text-gray-900 mb-4">Description</h2>

      <div className="mb-4">
        <textarea
          className="w-full p-3 border border-gray-300 rounded-md min-h-24 focus:outline-none focus:ring-2 focus:ring-blue-500"
          value={descriptionText}
          onChange={(e) => setDescriptionText(e.target.value)}
        />
      </div>

      <div className="flex justify-between items-center">
        <div className="flex space-x-1">
          {formatButtons.map((button, index) => (
            <button
              key={index}
              className="p-2 rounded-md hover:bg-gray-100"
              title={button.tooltip}
            >
              {button.icon}
            </button>
          ))}
        </div>

        <button
          className="flex items-center space-x-2 text-purple-600 px-3 py-1 rounded-md hover:bg-purple-50"
          onClick={handleGenerateWithAI}
        >
          <Sparkles className="w-4 h-4" />
          <span>Generate with AI</span>
        </button>
      </div>
    </div>
  );
}
