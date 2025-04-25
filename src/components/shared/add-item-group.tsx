import AutoComplete from "@/components/shared/form/AutoComplete";
import TextInputField from "@/components/shared/form/TextInputField";
import { Button } from "@/components/ui/button";
import { CreateDocument } from "@/lib/api/mutations.global";
import { Icon } from "@iconify/react/dist/iconify.js";
import { useMutation } from "@tanstack/react-query";
import { useFormik } from "formik";
import { useCallback } from "react";
import { toast } from "sonner";

const AddItemGroup = ({ onClose }: { onClose: () => void }) => {
  const { mutate, isPending } = useMutation({
    mutationKey: ["create-item-group"],
    mutationFn: CreateDocument,
    onSuccess: () => {
      toast.success("Item Group created succesfully");
    },
    onSettled: () => {
      onClose();
    },
  });

  const { ...form } = useFormik({
    initialValues: {
      item_group_name: "",
      expense_account: "",
      income_account: "",
    },
    onSubmit: (value) => {
      mutate({
        url: "/accounting/create/item-group",
        payload: {
          ...form.values,
        },
      });
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
      query: "erpnext.controllers.queries.get_income_account",
      type: "auto_complete",
      label: "Income Account",
      placeholder: "e.g. Cash 123 ",
      doctype: "Account",
      reference_doctype: "Asset Catergory",
      filters: {
        company: "CCT FUND-",
      },
    },
    {
      id: "expense_account",
      type: "auto_complete",
      label: "Expense Account",
      placeholder: "e.g. Building CF",
      doctype: "Account",
      reference_doctype: "Asset Catergory",
      query: "erpnext.controllers.queries.get_expense_account",
      filters: {
        company: "CCT FUND-",
      },
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
          // disabled={isPending}
          className="bg-primary-green text-black hover:bg-primary-green/hover"
          onClick={(e) => {
            e.preventDefault();
            form.handleSubmit();
          }}
        >
          {isPending ? (
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
