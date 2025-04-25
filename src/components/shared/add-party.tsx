import AutoComplete from "@/components/shared/form/AutoComplete";
import SelectInput from "@/components/shared/form/SelectInput";
import TextInputField from "@/components/shared/form/TextInputField";
import { Button } from "@/components/ui/button";
import { Icon } from "@iconify/react/dist/iconify.js";
import { useFormik } from "formik";
import React, { useCallback, useState } from "react"; // Import useState
import { toast } from "sonner";
import * as Y from "yup";

// Mock function for CreateDocument (reused from before)
const mockCreateDocument = async ({
  url,
  payload,
}: {
  url: string;
  payload: any;
}) => {
  await new Promise((resolve) => setTimeout(resolve, 500));
  console.log("Simulated API call to:", url, "with payload:", payload);
  return { data: { message: "Payment Party added successfully (simulated)" } };
};

// Mock data for the Country AutoComplete (reused from before)
const mockCountries = [
  { value: "Ghana", description: "West African country" },
  { value: "Nigeria", description: "West African giant" },
  { value: "United Kingdom", description: "Island country in Europe" },
  { value: "United States", description: "Country in North America" },
  { value: "Canada", description: "North American neighbor" },
];

const AddPartyModalBody = ({ onClose }: { onClose: () => void }) => {
  const formValidator = Y.object().shape({
    customer_name: Y.string().required("Supplier name is required"),
    customer_type: Y.string().required("Supplier type is required"),
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
      customer_name: "",
      customer_type: "",
      email_id: "",
      mobile_no: "",
      region: "",
      country: "",
      city: "",
    },
    validationSchema: formValidator,
    onSubmit: async (value) => {
      setIsSubmitting(true);
      try {
        const response = await mockCreateDocument({
          url: "/accounting/create/customer",
          payload: { ...value },
        });
        console.log(response);
        toast.success(
          response?.data?.message ||
            "Payment Party added successfully (simulated)"
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
      id: "customer_name",
      type: "text",
      label: "Company Name",
      placeholder: "e.g. Special Ice",
    },
    {
      id: "customer_type",
      type: "select",
      label: "Party Type",
      placeholder: "e.g. Individual",
      options: ["Company", "Individual", "Partnership"]?.map((option) => ({
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
                    filters={field?.filters}
                    doctype={field.doctype}
                    reference_doctype={field.reference_doctype}
                    onChange={(value) => {
                      handleSelectChange(field.id, value);
                    }}
                    {...field}
                    {...form}
                    extraClassName="text-[0.7rem] font-medium"
                    // Pass the mock items here as well
                    items={field.mockItems}
                  />
                </div>
              );
            case "select":
              return (
                <React.Fragment key={field.id}>
                  <SelectInput
                    items={field.options}
                    onChange={(value) => {
                      handleSelectChange(field.id, value);
                    }}
                    {...field}
                    {...form}
                    extraClassName="text-[0.7rem] font-medium"
                  />
                </React.Fragment>
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
                  key={field.id}
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

export default AddPartyModalBody;
