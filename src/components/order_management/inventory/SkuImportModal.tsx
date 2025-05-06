import React, { useState, ChangeEvent } from "react";
import ModalLayout from "@/layouts/ModalLayout";
import { Icon } from "@iconify/react";
import { Button } from "@/components/ui/button";
import SelectField from "@/components/common/SelectField";
import SimpleTable from "@/components/common/SimpleTable";

interface SkuImportModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const SkuImportModal: React.FC<SkuImportModalProps> = ({ isOpen, onClose }) => {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [selectedAccount, setSelectedAccount] = useState<string>("");
  const [columnMappings, setColumnMappings] = useState([
    {
      key: "materialAttributes",
      fileColumn: "Column Updashed",
      sampleData: "",
    },
    {
      key: "customsIdentifier",
      fileColumn: "Customer ID:",
      sampleData: "2,5000",
    },
    {
      key: "customerBencide",
      fileColumn: "Customer Bencide",
      sampleData: "/Users/client/",
    },
    { key: "windowSign", fileColumn: "Sign:", sampleData: "2,5000" },
    { key: "bondNotes", fileColumn: "Bond Notes", sampleData: "ORO" },
    {
      key: "productCategory",
      fileColumn: "Product Category",
      sampleData: "Starter S4E",
    },
    {
      key: "productSubCategory",
      fileColumn: "Product Sub Category",
      sampleData: "No.",
    },
    {
      key: "productDescription",
      fileColumn: "Bond Notes",
      sampleData: "AB-WHT-435 Starter Set",
    },
  ]);

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      setSelectedFile(e.target.files[0]);
    }
  };

  const handleAccountChange = (e: ChangeEvent<HTMLSelectElement>) => {
    setSelectedAccount(e.target.value);
  };

  const handleColumnMappingChange = (index: number, value: string) => {
    const updatedMappings = [...columnMappings];
    updatedMappings[index].fileColumn = value;
    setColumnMappings(updatedMappings);
  };

  const tabs = ["Upload File", "Column Mapping", "Confirm", "Import"];

  return (
    <ModalLayout
      isOpen={isOpen}
      onClose={onClose}
      title="Import SKU's"
      description="Games cannot win SKU upload? Please use the following documentation for processing further."
      tabs={tabs}
      className="w-full max-w-3xl"
    >
      {/* Upload File Tab */}
      {/* <div className="space-y-6"> */}
      {/* {activeTab === 0 && ( */}
      <>
        <div className="bg-gray-50 p-4 rounded-lg">
          <h3 className="font-medium mb-2">Documentation</h3>
          <ol className="list-decimal pl-5 space-y-1 text-sm text-gray-600">
            <li>You can download about our data.</li>
            <li>Make sure your file has correct column headers.</li>
            <li>This number of rows should not exceed 1000.</li>
          </ol>
          <div className="mt-4 flex gap-2">
            <Button variant="outline" className="text-sm">
              <Icon icon="heroicons:document-text" className="mr-2" />
              Your Documentation
            </Button>
            <Button variant="outline" className="text-sm">
              <Icon icon="heroicons:document-text" className="mr-2" />
              Your Example
            </Button>
          </div>
        </div>

        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium mb-1">
              Select Account
            </label>
            <select
              className="w-full p-2 border border-gray-300 rounded-md"
              value={selectedAccount}
              onChange={handleAccountChange}
            >
              <option value="">Select an account</option>
              <option value="Large Client">Large Client</option>
              <option value="Medium Client">Medium Client</option>
              <option value="Small Client">Small Client</option>
            </select>
          </div>

          <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center">
            <input
              type="file"
              id="file-upload"
              className="hidden"
              onChange={handleFileChange}
              accept=".csv, .xlsx, .xls"
            />
            <label htmlFor="file-upload" className="cursor-pointer">
              <div className="flex flex-col items-center justify-center space-y-2">
                <Icon
                  icon="heroicons-outline:cloud-upload"
                  className="text-4xl text-gray-400"
                />
                <p className="text-sm font-medium">
                  Drag-and-drop file, or browse computer
                </p>
                <p className="text-xs text-gray-500">
                  Supports: .csv, .xlsx, .xls
                </p>
              </div>
            </label>
            {selectedFile && (
              <div className="mt-4 text-sm text-gray-700">
                Selected file:{" "}
                <span className="font-medium">{selectedFile.name}</span>
              </div>
            )}
          </div>
        </div>
      </>
      {/* )} */}

      {/* Column Mapping Tab */}
      {/* {activeTab === 1 && ( */}
      <div className="space-y-6">
        <div className="bg-gray-50 p-4 rounded-lg">
          <h3 className="font-medium mb-2">Header Column Mapping</h3>
          <p className="text-sm text-gray-600">
            Confirm each column in your file matches the required system column.
          </p>
        </div>

        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Materials Attributes
                </th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  File Column
                </th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Sample Data
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {columnMappings.map((mapping, index) => (
                <tr key={index}>
                  <td className="px-4 py-3 whitespace-nowrap text-sm font-medium text-gray-900 capitalize">
                    {mapping.key.replace(/([A-Z])/g, " $1").trim()}
                  </td>
                  <td className="px-4 py-3 whitespace-nowrap">
                    <SelectField
                      classname="border border-gray-300 rounded-md p-1 text-sm"
                      value={mapping.fileColumn}
                      onChange={(e) =>
                        handleColumnMappingChange(index, e.target.value)
                      }
                      options={[mapping.fileColumn]}
                    />
                  </td>
                  <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-500">
                    {mapping.sampleData}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <div className="space-y-6">
        <div className="bg-green-50 border border-green-100 p-4 rounded-lg">
          <div className="flex items-center">
            <Icon
              icon="heroicons:check-circle"
              className="text-green-500 mr-2"
            />
            <h3 className="font-medium text-green-800">
              Your file is ready to import!
            </h3>
          </div>
          <p className="text-sm text-green-700 mt-1">
            No issues were found with your upload file. Please review the
            summary below before importing.
          </p>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div className="bg-gray-50 p-4 rounded-lg">
            <h4 className="text-sm font-medium mb-2">File Details</h4>
            <div className="space-y-2 text-sm text-gray-600">
              <p>
                <span className="font-medium">Filename:</span>{" "}
                {selectedFile?.name}
              </p>
              <p>
                <span className="font-medium">Account:</span>{" "}
                {selectedAccount || "Not selected"}
              </p>
              <p>
                <span className="font-medium">Rows:</span> 42
              </p>
              <p>
                <span className="font-medium">Size:</span>{" "}
                {(selectedFile?.size || 0) / 1024} KB
              </p>
            </div>
          </div>

          <div className="bg-gray-50 p-4 rounded-lg">
            <h4 className="text-sm font-medium mb-2">Import Summary</h4>
            <div className="space-y-2 text-sm text-gray-600">
              <p>
                <span className="font-medium">New SKUs:</span> 15
              </p>
              <p>
                <span className="font-medium">Updated SKUs:</span> 27
              </p>
              <p>
                <span className="font-medium">Unchanged SKUs:</span> 0
              </p>
            </div>
          </div>
        </div>

        <div>
          <h4 className="text-sm font-medium mb-2">Preview (first 5 rows)</h4>
          <div className="overflow-hidden">
            <SimpleTable
              columns={[
                { key: "sku", label: "SKU" },
                { key: "description", label: "Description" },
                { key: "category", label: "Category" },
                { key: "status", label: "Status" },
              ]}
              data={[
                {
                  id: 1,
                  sku: "AB-WHT-435",
                  description: "Starter Set",
                  category: "Starter",
                  status: "New",
                },
                {
                  id: 2,
                  sku: "CD-BLK-123",
                  description: "Advanced Kit",
                  category: "Advanced",
                  status: "Update",
                },
                {
                  id: 3,
                  sku: "EF-RED-789",
                  description: "Pro Bundle",
                  category: "Professional",
                  status: "New",
                },
                {
                  id: 4,
                  sku: "GH-BLU-456",
                  description: "Basic Pack",
                  category: "Basic",
                  status: "Update",
                },
                {
                  id: 5,
                  sku: "IJ-GRN-012",
                  description: "Deluxe Set",
                  category: "Deluxe",
                  status: "Update",
                },
              ]}
            />
          </div>
        </div>
      </div>

      <div className="flex flex-col items-center justify-center py-12">
        <div className="bg-green-100 p-4 rounded-full mb-4">
          <Icon icon="heroicons:check" className="text-green-600 text-4xl" />
        </div>
        <h3 className="text-xl font-medium mb-2">Import Successful!</h3>
        <p className="text-gray-600 mb-6 text-center max-w-md">
          Your SKUs have been successfully imported. You can view the imported
          items in the SKU management section.
        </p>
        <div className="grid grid-cols-2 gap-4 w-full max-w-xs">
          <Button variant="outline" onClick={onClose}>
            Close
          </Button>
          <Button>
            <Icon icon="heroicons:eye" className="mr-2" />
            View SKUs
          </Button>
        </div>
      </div>
    </ModalLayout>
  );
};

export default SkuImportModal;
