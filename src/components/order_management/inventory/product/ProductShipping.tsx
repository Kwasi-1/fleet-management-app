import { useState } from "react";
import InputField from "@/components/common/InputField";
import SelectField from "@/components/common/SelectField";
import { Card } from "@/components/ui/card";
import { Product } from "@/types/products";

interface ProductShippingProps {
  product: Product;
  onShippingUpdate: (updatedShipping: Product["shipping"]) => void;
}

function ProductShipping({ product, onShippingUpdate }: ProductShippingProps) {
  const [shippingData, setShippingData] = useState(product.shipping);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    const updatedData = {
      ...shippingData,
      [name]: name === "shipsInternationally" ? e.target.checked : value,
    };
    setShippingData(updatedData);
    onShippingUpdate(updatedData);
  };

  const handleSelectChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const { name, value } = e.target;
    const updatedData = {
      ...shippingData,
      [name]: value,
    };
    setShippingData(updatedData);
    onShippingUpdate(updatedData);
  };

  return (
    <Card className="p-6 ">
      <h2 className="font-medium text-lg">Shipping Dimensions & Options</h2>
      <p className="text-sm text-[#929292] mb-4">
        Specify the shipping dimensions and international availability for this
        product.
      </p>

      <div className="grid grid-cols-2 gap-6 items-end">
        <InputField
          name="weight"
          label="Weight"
          value={shippingData.weight.toString()}
          onChange={handleInputChange}
        />
        <SelectField
          name="weightUnit"
          options={["Kilogram (kg)", "Pound (lb)"]}
          value={shippingData.weightUnit}
          onChange={handleSelectChange}
        />

        <InputField
          name="length"
          label="Length"
          value={shippingData.length.toString()}
          onChange={handleInputChange}
        />
        <SelectField
          name="lengthUnit"
          options={["Centimeter (cm)", "Inch (in)"]}
          value={shippingData.lengthUnit}
          onChange={handleSelectChange}
        />

        <InputField
          name="height"
          label="Height"
          value={shippingData.height.toString()}
          onChange={handleInputChange}
        />
        <SelectField
          name="heightUnit"
          options={["Centimeter (cm)", "Inch (in)"]}
          value={shippingData.heightUnit}
          onChange={handleSelectChange}
        />
      </div>

      <div className="mt-4">
        <label className="flex items-center cursor-pointer">
          <input
            type="checkbox"
            name="shipsInternationally"
            checked={shippingData.shipsInternationally}
            onChange={handleInputChange}
            className="w-4 h-4 text-blue-600 border-gray-300 rounded"
          />
          <span className="ml-2 text-sm">
            This product ships internationally
          </span>
        </label>
      </div>
    </Card>
  );
}

export default ProductShipping;
