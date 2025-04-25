import AutoComplete from "@/components/shared/form/AutoComplete";
import SelectInput from "@/components/shared/form/SelectInput";
import TextInputField from "@/components/shared/form/TextInputField";
import { Button } from "@/components/ui/button";
import { Icon } from "@iconify/react/dist/iconify.js";
import { useFormik } from "formik";
import { useCallback, useState } from "react"; // Import useState
import { toast } from "sonner";
import * as Y from "yup";

// Mock function for CreateDocument
const mockCreateDocument = async ({
  url,
  payload,
}: {
  url: string;
  payload: any;
}) => {
  // Simulate a successful response after a short delay
  await new Promise((resolve) => setTimeout(resolve, 500));
  console.log("Simulated API call to:", url, "with payload:", payload);
  // Simulate success (you can add logic here to simulate errors based on payload)
  return { data: { message: "Supplier added successfully (simulated)" } };
};

// Mock data for the Country AutoComplete
const mockCountries = [
  { value: "Ghana", description: "West African country" },
  { value: "Nigeria", description: "West African giant" },
  { value: "United Kingdom", description: "Island country in Europe" },
  { value: "United States", description: "Country in North America" },
  { value: "Canada", description: "North American neighbor" },
];

const AddSupplierModalBody = ({ onClose }: { onClose: () => void }) => {
  const formValidator = Y.object().shape({
    supplier_name: Y.string().required("Party name is required"),
    supplier_type: Y.string().required("Party type is required"),
    email_id: Y.string()
      .email("Invalid email format")
      .required("Email is required"),
    mobile_no: Y.string().required("Mobile number is required"),
    region: Y.string().required("Region is required"),
    country: Y.string().required("Country is required"),
    city: Y.string().required("City is required"),
  });

  const [isSubmitting, setIsSubmitting] = useState(false); // State to track submission

  const { ...form } = useFormik({
    initialValues: {
      supplier_name: "",
      supplier_type: "",
      email_id: "",
      mobile_no: "",
      region: "",
      country: "",
      city: "",
    },
    validationSchema: formValidator,
    validateOnMount: false,
    onSubmit: async (value) => {
      setIsSubmitting(true);
      try {
        const response = await mockCreateDocument({
          url: "/accounting/create/supplier",
          payload: { ...value },
        });
        console.log(response);
        toast.success(
          response?.data?.message || "Supplier added successfully (simulated)"
        );
        onClose();
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
      id: "supplier_name",
      type: "text",
      label: "Supplier Name",
      placeholder: "e.g. Special Ice",
    },
    {
      id: "supplier_type",
      type: "select",
      label: "Supplier Type",
      placeholder: "e.g. Individual",
      options: ["Individual", "Partnership", "Company"]?.map((option) => ({
        label: option,
        value: option,
      })),
    },
    {
      id: "email_id",
      type: "text",
      label: "Email",
      placeholder: "e.g. nk@access89.com",
    },
    {
      id: "mobile_no",
      type: "text",
      label: "Mobile Number",
      placeholder: "e.g. 02012312234",
    },
    {
      id: "country",
      type: "auto_complete",
      label: "Country",
      placeholder: "e.g. Ghana",
      doctype: "Country",
      reference_doctype: "Customer",
      filters: "",
      // Pass the mock data here
      mockItems: mockCountries,
    },
    {
      id: "city",
      type: "text",
      label: "City",
      placeholder: "e.g. Oyarifa",
    },
    {
      id: "region",
      type: "select",
      label: "Region",
      placeholder: "e.g. Greater Accra",
      options: [
        "Greater Accra",
        "Ashanti",
        "Western",
        "Western North",
        "Eastern",
        "Central",
        "Northern",
        "North East",
        "Savannah",
        "Upper East",
        "Upper West",
        "Volta",
        "Oti",
        "Bono",
        "Bono East",
        "Ahafo",
      ]?.map((option) => ({
        label: option,
        value: option,
      })),
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
                  key={field.id}
                  id={field.id}
                  placeholder={field.placeholder}
                  label={field.label}
                  {...form}
                  extraClassName="w-full"
                />
              );

            case "auto_complete":
              return (
                <div>
                  <AutoComplete
                    key={field.id}
                    filters={field?.filters}
                    doctype={field.doctype}
                    reference_doctype={field.reference_doctype}
                    onChange={(value) => {
                      handleSelectChange(field.id, value);
                    }}
                    {...field}
                    {...form}
                    extraClassName="text-[0.7rem] font-medium"
                    // Pass the mock items as a prop
                    items={field.mockItems}
                  />
                  {/* {field.addTitle && (
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
                                    )} */}
                </div>
              );
            case "select":
              return (
                <>
                  <SelectInput
                    items={field.options}
                    onChange={(value) => {
                      handleSelectChange(field.id, value);
                    }}
                    {...field}
                    {...form}
                    key={field.id}
                    extraClassName="text-[0.7rem] font-medium"
                  />
                </>
              );
            case "date":
              return (
                <TextInputField
                  id={field.id}
                  placeholder={field.placeholder}
                  label={field.label}
                  {...form}
                  type="date"
                  extraClassName="w-full"
                />
              );
          }
        })}
      </div>
      <div className=" grid grid-cols-2 gap-3 col-span-2 mt-5">
        <div className="col-span-3"></div>
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
    </div>
  );
};

export default AddSupplierModalBody;
