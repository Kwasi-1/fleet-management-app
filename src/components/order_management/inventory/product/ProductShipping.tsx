import { useState } from "react";
import InputField from "@/components/common/InputField";
import SelectField from "@/components/common/SelectField";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Building, ExternalLink } from "lucide-react";
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

  const handlePhysicalToggle = (isPhysical: boolean) => {
    const updatedData = {
      ...shippingData,
      isPhysical,
    };
    setShippingData(updatedData);
    onShippingUpdate(updatedData);
  };

  return (
    <Card className="p-6 ">
      <h2 className="font-medium mb-4">Shipping</h2>
      <p className="text-sm text-gray-600 mb-4">
        Eu enim erat facilisi viverra non nisl. Scelerisque a malesuada facilisi
        aliquet consectetur. Eu enim erat facilisi viverra non nisl.
      </p>

      <div className="flex space-x-4 mb-6">
        <Button
          variant={shippingData.isPhysical ? "default" : "outline"}
          className="flex items-center gap-2"
          onClick={() => handlePhysicalToggle(true)}
        >
          <Building className="h-4 w-4" />
          <span>Physical product</span>
        </Button>
        <Button
          variant={!shippingData.isPhysical ? "default" : "outline"}
          className="flex items-center gap-2"
          onClick={() => handlePhysicalToggle(false)}
        >
          <ExternalLink className="h-4 w-4" />
          <span>Digital product or service</span>
        </Button>
      </div>

      {shippingData.isPhysical && (
        <>
          <div className="grid grid-cols-2 gap-6 items-end">
            <InputField
              name="weight"
              label="Weight"
              value={shippingData.weight.toString()}
              onChange={handleInputChange}
              type="number"
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
              type="number"
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
              type="number"
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
        </>
      )}
    </Card>
  );
}

export default ProductShipping;
