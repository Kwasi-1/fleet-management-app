import AutoComplete from "@/components/shared/form/AutoComplete";
import TextInputField from "@/components/shared/form/TextInputField";
import { Button } from "@/components/ui/button";
import { Icon } from "@iconify/react/dist/iconify.js";
import { useFormik } from "formik";
import { useCallback, useState } from "react"; // Import useState
import { toast } from "sonner";

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
  return { data: { message: "Item Group created successfully (simulated)" } };
};

// Mock data for Accounts
const mockAccounts = [
  { value: "Cash 123", description: "Main Cash Account" },
  { value: "Building CF", description: "Cost of Buildings" },
  { value: "Sales Revenue", description: "Income from Sales" },
  { value: "Salaries Expense", description: "Employee Salaries" },
];

const AddItemGroup = ({ onClose }: { onClose: () => void }) => {
  const [isSubmitting, setIsSubmitting] = useState(false); // State for submission

  const { ...form } = useFormik({
    initialValues: {
      item_group_name: "",
      expense_account: "",
      income_account: "",
    },
    onSubmit: async (value) => {
      setIsSubmitting(true);
      try {
        const response = await mockCreateDocument({
          url: "/accounting/create/item-group",
          payload: {
            ...form.values,
          },
        });
        console.log(response);
        toast.success(
          response?.data?.message ||
            "Item Group created successfully (simulated)"
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
      id: "item_group_name",
      type: "text",
      label: "Item Group Name",
      placeholder: "e.g Electronics",
    },
    {
      id: "income_account",
      type: "auto_complete",
      label: "Income Account",
      placeholder: "e.g. Cash 123 ",
      doctype: "Account",
      reference_doctype: "Asset Catergory",
      filters: {
        company: "CCT FUND-",
      },
      // Pass mock data for Income Account
      mockItems: mockAccounts.filter((account) =>
        account.value.includes("Income")
      ),
    },
    {
      id: "expense_account",
      type: "auto_complete",
      label: "Expense Account",
      placeholder: "e.g. Building CF",
      doctype: "Account",
      reference_doctype: "Asset Catergory",
      filters: {
        company: "CCT FUND-",
      },
      // Pass mock data for Expense Account
      mockItems: mockAccounts.filter((account) =>
        account.value.includes("Expense")
      ),
    },
  ];
  const handleSelectChange = useCallback(
    (id: string, value: string) => {
      form.setFieldValue(id, value);
    },
    [form]
  );

  return (
    <div className="pb-6">
      <div className="grid grid-cols-1 gap-3">
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
                <AutoComplete
                  filters={field?.filters}
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
              );
          }
        })}
      </div>
      <div className=" grid grid-cols-2 gap-3 col-span-2 mt-5">
        <Button
          className="bg-white border-[0.85px] hover:bg-primary-green/5 border-primary-green text-primary-green"
          onClick={(e) => {
            e.preventDefault();
            onClose();
          }}
        >
          Cancel
        </Button>
        <Button
          disabled={isSubmitting}
          className="bg-primary-green text-black hover:bg-primary-green/hover"
          onClick={(e) => {
            e.preventDefault();
            form.handleSubmit();
          }}
        >
          {isSubmitting ? (
            <Icon icon={"eos-icons:loading"} />
          ) : (
            "Create Item Group"
          )}
        </Button>
      </div>
    </div>
  );
};

export default AddItemGroup;
