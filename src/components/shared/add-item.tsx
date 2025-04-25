import AutoComplete from "@/components/shared/form/AutoComplete";
import TextInputField from "@/components/shared/form/TextInputField";
import CustomModal from "@/components/shared/modal";
import { Button } from "@/components/ui/button";
import { Icon } from "@iconify/react/dist/iconify.js";
import { useDisclosure } from "@nextui-org/react";
import { useFormik } from "formik";
import { useCallback, useState } from "react"; // Import useState
import { toast } from "sonner";
import * as Y from "yup";

import AddAssetCategory from "./add-asset-category";
import Toggle from "@/components/shared/form/Toggle";
import AddItemGroup from "./add-item-group";

// Mock function for CreateDocument (reused)
const mockCreateDocument = async ({
  url,
  payload,
}: {
  url: string;
  payload: any;
}) => {
  await new Promise((resolve) => setTimeout(resolve, 500));
  console.log("Simulated API call to:", url, "with payload:", payload);
  return { data: { message: "Item created successfully (simulated)" } };
};

// Mock data for Item Group
const mockItemGroups = [
  { value: "Service", description: "Professional services" },
  { value: "Product", description: "Tangible goods" },
  { value: "Expense", description: "Operational costs" },
];

// Mock data for Unit of Measure
const mockUOMs = [
  { value: "Units", description: "Standard units" },
  { value: "Hours", description: "Time-based measurement" },
  { value: "Pieces", description: "Individual items" },
];

// Mock data for Asset Category
const mockAssetCategories = [
  { value: "Electronics", description: "Computers, phones, etc." },
  { value: "Machinery", description: "Industrial equipment" },
  { value: "Vehicles", description: "Cars, trucks, etc." },
  { value: "Furniture", description: "Desks, chairs, etc." },
];

const AddItemModalBody = ({
  onClose,
}: {
  onClose: (refetch?: boolean) => void;
}) => {
  const formValidator = Y.object().shape({
    item_name: Y.string().required("Item name is required"),
    item_group: Y.string().required("Item group is required"),
    default_unit_of_measure: Y.string().required("Unit of measure is required"),
    is_fixed_asset: Y.boolean().required("Fixed asset status is required"),
    asset_category: Y.string()
      .nullable()
      .when("is_fixed_asset", ([isFixedAsset], schema) =>
        isFixedAsset
          ? schema.required("Asset category is required for fixed assets")
          : schema.notRequired()
      ),
  });
  const addAssetCategoryModal = useDisclosure();
  const addItemGroupModal = useDisclosure();
  const [isSubmitting, setIsSubmitting] = useState(false); // State for submission

  const { ...form } = useFormik({
    initialValues: {
      item_name: "",
      item_group: "",
      default_unit_of_measure: "",
      is_fixed_asset: false,
      asset_category: "",
    },
    validationSchema: formValidator,
    validateOnMount: false,
    onSubmit: async (value) => {
      setIsSubmitting(true);
      try {
        const response = await mockCreateDocument({
          url: "/accounting/create/item",
          payload: {
            stock_uom: value.default_unit_of_measure,
            item_code: value.item_name,
            item_group: value.item_group,
            is_fixed_asset: Boolean(value.is_fixed_asset),
            is_stock_item: !Boolean(value.is_fixed_asset),
            asset_category: value.asset_category,
          },
        });
        console.log(response);
        toast.success(
          response?.data?.message || "Item created successfully (simulated)"
        );
        onClose(true);
      } catch (error: any) {
        console.error(error);
        toast.error(error?.message || "An error occurred (simulated)");
      } finally {
        setIsSubmitting(false);
      }
    },
  });

  const fields = [
    {
      id: "item_name",
      type: "text",
      label: "Item Name",
      placeholder: "e.g Audit Service",
    },

    {
      id: "item_group",
      type: "auto_complete",
      label: "Item Group",
      placeholder: "e.g. Service",
      doctype: "Item Group",
      reference_doctype: "Item",
      onAddClick: () => {
        addItemGroupModal.onOpen();
      },
      addTitle: "Add Item Group",
      filters: {
        custom_is_expense_class: 0,
      },
      // Pass mock data for Item Group
      mockItems: mockItemGroups,
    },
    {
      id: "default_unit_of_measure",
      type: "auto_complete",
      label: "Default Unit of Measure",
      placeholder: "e.g. Units",
      doctype: "UOM",
      reference_doctype: "Item",
      // Pass mock data for UOM
      mockItems: mockUOMs,
    },
    ...(Boolean(form.values.is_fixed_asset)
      ? [
          {
            id: "asset_category",
            type: "auto_complete",
            label: "Asset Category",
            placeholder: "e.g. Electronics",
            doctype: "Asset Category",
            reference_doctype: "Item",
            onAddClick: () => {
              addAssetCategoryModal.onOpen();
            },
            addTitle: "Add Asset Category",
            // Pass mock data for Asset Category
            mockItems: mockAssetCategories,
          },
        ]
      : []),
    {
      type: "checkbox",
      label: "Fixed Asset",
      placeholder: "e.g. ",
      id: "is_fixed_asset",
    },
  ];

  const handleSelectChange = useCallback(
    (id: string, value: string) => {
      form.setFieldValue(id, value);
    },
    [form]
  );

  return (
    <div className="h-full flex justify-between pb-6 flex-col">
      <div className="grid grid-cols-2 gap-3">
        {fields?.map((field) => {
          switch (field.type) {
            case "text":
              return (
                <TextInputField
                  id={field.id}
                  placeholder={field.placeholder}
                  label={field.label}
                  {...form}
                  extraClassName="w-full"
                  key={field.id}
                />
              );

            case "auto_complete":
              return (
                <div key={field.id}>
                  <AutoComplete
                    filters={field.filters}
                    doctype={field.doctype}
                    reference_doctype={field.reference_doctype}
                    onChange={(value) => {
                      handleSelectChange(field.id, value);
                    }}
                    {...field}
                    {...form}
                    key={field.id}
                    extraClassName="text-[0.7rem] font-medium"
                    // Pass the mock items here
                    items={field.mockItems}
                  />
                  {field.addTitle && (
                    <p
                      className="text-primary-green text-[0.7rem] mt-1 cursor-pointer"
                      onClick={(event) => {
                        event.preventDefault();
                        event.stopPropagation();
                        field.onAddClick();
                      }}
                    >
                      +{field.addTitle}
                    </p>
                  )}
                </div>
              );

            case "checkbox":
              return (
                <div className=" flex items-end" key={field.id}>
                  <Toggle
                    {...field}
                    {...form}
                    extraClassName="text-[0.85rem] font-medium"
                  />
                </div>
              );
          }
        })}
      </div>

      <div className=" grid grid-cols-2 gap-3 col-span-2 mt-5">
        <Button
          className="bg-white border-[0.85px] hover:bg-red-100 border-red-600 text-red-600 rounded-xl"
          onClick={(e) => {
            e.preventDefault();
            onClose();
          }}
        >
          Cancel
        </Button>
        <Button
          disabled={isSubmitting}
          className="bg-primary-green text-white hover:bg-primary-green/hover flex items-center gap-2 rounded-xl"
          onClick={(e) => {
            e.preventDefault();
            form.handleSubmit();
          }}
        >
          {isSubmitting ? <Icon icon={"eos-icons:loading"} /> : "Add"}
        </Button>
      </div>
      <CustomModal
        placement="top"
        header={
          <>
            <h4 className="text-[1.05rem] font-semibold">Add Asset Category</h4>
          </>
        }
        {...addAssetCategoryModal}
        body={
          <AddAssetCategory
            onClose={function (): void {
              addAssetCategoryModal.onClose();
            }}
          />
        }
      />

      <CustomModal
        placement="top"
        header={
          <>
            <h4 className="text-[1.05rem] font-semibold">Add Item Group</h4>
          </>
        }
        {...addItemGroupModal}
        body={
          <AddItemGroup
            onClose={function (): void {
              addItemGroupModal.onClose();
            }}
          />
        }
      />
    </div>
  );
};

export default AddItemModalBody;
