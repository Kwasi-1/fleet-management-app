import { useState } from "react";
import InputField from "@/components/common/InputField";
import SelectField from "@/components/common/SelectField";
import { Card } from "@/components/ui/card";
import { Product } from "@/types/products";
import { Switch } from "@/components/ui/switch";

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
    <Card className="p-6">
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

      <div className="flex justify-between items-center space-x-3 mt-6">
        <span className="text-sm">This product ships internationally</span>

        <Switch
          checked={shippingData.shipsInternationally}
          onCheckedChange={(checked) =>
            handleInputChange({
              target: { name: "shipsInternationally", checked, value: "" },
            } as any)
          }
        />
      </div>
    </Card>
  );
}

export default ProductShipping;
