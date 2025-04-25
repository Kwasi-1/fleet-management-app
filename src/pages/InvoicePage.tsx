import AutoComplete from "../components/shared/form/AutoComplete";
import CustomDatePicker from "../components/shared/form/CustomDatePicker";
import TextInputField from "../components/shared/form/TextInputField";
import CustomModal from "../components/shared/modal";
import { Button } from "@/components/ui/button";
import { Icon } from "@iconify/react/dist/iconify.js";
import { useDisclosure } from "@nextui-org/react";
import { useFormik } from "formik";
import { isEmpty } from "lodash";
import React, { useCallback, useState } from "react";
import AddSupplierModalBody from "@/components/shared/add-supplier";
import { useMutation } from "@tanstack/react-query";
import { CreateDocument } from "@/lib/api/mutations.global";
import { parseToMoney } from "@/utils/helpers";
import { useNavigate, useSearchParams } from "react-router-dom";
import { toast } from "sonner";
import AddPartyModalBody from "@/components/shared/add-party";
import SelectItem from "@/components/shared/select-item";
import { variables } from "@/utils/env";
import { apiInstance } from "@/lib/api";
import AddItemModalBody from "@/components/shared/add-item";
import * as Y from "yup";

type TInvoice = "purchase" | "sales";

const InvoicePage = () => {
  const navigate = useNavigate();

  const [params] = useSearchParams();
  const iType = params.has("type") ? params.get("type") : "purchase";
  const [invoiceType] = useState<TInvoice>(iType as TInvoice);
  const formSchema = Y.object().shape({
    posting_date: Y.string().required("Posting Date is required"),
    payment_due_date: Y.string().required("Payment Due Date is required"),
    party: Y.string().required(
      `${invoiceType == "purchase" ? "Supplier" : "Party"} is required`
    ),
    items: Y.string().required("At least on item has to be selected"),
  });
  const { ...form } = useFormik({
    initialValues: {
      posting_date: "",
      mode_of_payment: "",
      party_type: "",
      party: "",
      payment_due_date: "",
      items: "",
    },
    validationSchema: formSchema,
    onSubmit: (values) => {
      form.setFieldTouched("items", true);
      if (invoiceType == "purchase") {
        toast.promise(
          CreatePurchaseInvoice({
            url: "/accounting/create/purchase-invoice",
            payload: {
              posting_date: values?.posting_date,
              due_date: values?.payment_due_date,
              supplier: values?.party,
              items,
            },
          }),
          {
            loading: "Creating Sales Invoice",
            success: "Sales invoice created succesfully",
            error: "An error occured creating a sales invoice",
          }
        );
      } else {
        toast.promise(
          CreateSalesInvoice({
            url: "/accounting/create/sales-invoice",
            payload: {
              posting_date: values?.posting_date,
              due_date: values?.payment_due_date,
              customer: values?.party,
              items,
            },
          }),
          {
            loading: "Creating Sales Invoice",
            success: "Sales invoice created succesfully",
            error: "An error occured creating a sales invoice",
          }
        );
      }
    },
  });

  const addSupplierModal = useDisclosure();
  const addItemsModal = useDisclosure();
  const [items, setItems] = useState<any[]>([]);
  const [editMode, setEditMode] = useState(false);
  const addPartyModal = useDisclosure();
  const fields = [
    {
      id: "posting_date",
      type: "date",
      label: "Posting Date",
      placeholder: "",
    },
    {
      id: "payment_due_date",
      type: "date",
      label: "Payment Due Date",
      placeholder: "",
    },
    ...(invoiceType == "purchase"
      ? [
          {
            id: "party",
            type: "auto_complete",
            label: "Supplier",
            placeholder: "e.g. Access 89",
            doctype: "Supplier",
            reference_doctype: "Purchase Invoice",
            addTitle: "Add Supplier",
            onAddClick: () => {
              addSupplierModal.onOpen();
            },
            filters: {},
          },
        ]
      : [
          {
            id: "party",
            type: "auto_complete",
            label: "Party",
            placeholder: "e.g. Access 89",
            doctype: "Customer",
            reference_doctype: "Sales Invoice",
            addTitle: "Add Payment Party",
            onAddClick: () => {
              addPartyModal.onOpen();
            },
          },
        ]),
  ];
  const handleSelectChange = useCallback(
    (id: string, value: string) => {
      form.setFieldValue(id, value);
    },
    [form]
  );

  const {
    isPending: CreatePurchaseInvoicePending,
    mutateAsync: CreatePurchaseInvoice,
  } = useMutation({
    mutationKey: ["create-purchase-invoice"],
    mutationFn: CreateDocument,
    onSettled: () => {
      handleClose();
    },
  });
  const {
    isPending: CreateSalesInvoicePending,
    mutateAsync: CreateSalesInvoice,
  } = useMutation({
    mutationKey: ["create-purchase-invoice"],
    mutationFn: CreateDocument,
    onSettled: () => {
      handleClose();
    },
  });

  const stockItemDetails = useMutation({
    mutationFn: apiInstance,
  });
  function handleClose() {
    navigate(
      `/dashboard/accounting/masters/${
        invoiceType == "purchase" ? "account-payable" : "account-receivable"
      }`
    );
  }
  return (
    <div className="grid grid-cols-[0.7fr,1fr] gap-4 h-[90vh]">
      <div className="flex justify-between flex-col">
        <div className="pt-4">
          <button
            className="flex col-span-full items-center h-fit gap-2 text-primary-green text-[1.1rem] mb-6 hover:underline"
            onClick={() => {
              navigate(
                `/dashboard/accounting/masters/${
                  invoiceType == "purchase"
                    ? "account-payable"
                    : "account-receivable"
                }`
              );
            }}
          >
            <Icon icon={"hugeicons:arrow-turn-backward"} />
            <p>Back</p>
          </button>
          <h4 className="font-medium text-[1.2rem] mb-2">Invoice Details</h4>
          <form action="#" className="w-[60%] flex flex-col gap-4">
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
                      extraClassName="w-full bg-default-100"
                    />
                  );

                case "auto_complete":
                  return (
                    <div>
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

                case "date":
                  return (
                    <CustomDatePicker
                      key={field.id}
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
          </form>
          <div>
            <h4 className="font-medium text-[1.2rem] mb-2 mt-6">
              Items (Services)
            </h4>
            <SelectItem
              touched={form.touched}
              label={"Items"}
              onChange={async (value: string) => {
                form.setFieldValue("items", "selected");
                stockItemDetails
                  .mutateAsync({
                    method: "get",
                    url:
                      variables().HR_ACCOUNTING_BASE_URL +
                      "/accounting/get/stock-item-details",
                    params: {
                      item_code: value,
                      doctype:
                        invoiceType == "purchase"
                          ? "Purchase Invoice"
                          : "Sales Invoice",
                    },
                  })
                  .then((data) => {
                    setItems((prev) => [...prev, data?.data?.data?.message]);
                  });
              }}
              id={"items"}
              placeholder="e.g Painter Service"
              doctype={"Item"}
              reference_doctype={
                invoiceType == "purchase"
                  ? "Purchase Invoice Item"
                  : "Sales Invoice Item"
              }
              filters={{
                ...(invoiceType == "purchase"
                  ? { is_purchase_item: 1 }
                  : { is_sales_item: 1 }),
                has_variants: 0,
                // custom_is_expense_item: 0,
              }}
              errors={form.errors}
            />
            <p
              className="text-primary-green text-[0.7rem] mt-1 cursor-pointer"
              onClick={(event) => {
                event.preventDefault();
                event.stopPropagation();
                // field.onAddClick();
                addItemsModal.onOpen();
              }}
            >
              + Add new item (service)
            </p>
          </div>
          <div className="mt-1 border-b border-collapse rounded-md ">
            <table className=" w-full text-xs ">
              <thead className="text-default-500">
                <tr className=" border-b-1 border-gray-300 font-semibold relative">
                  <td className="px-2 py-3">Item Name</td>
                  <td className="px-2 py-3">Qty</td>
                  <td className="px-2 py-3 flex gap-x-1 h-full items-center justify-between ">
                    <div> Rate</div>
                  </td>
                  <button
                    type="button"
                    onClick={() => setEditMode(!editMode)}
                    className="h-full absolute right-0 top-0"
                  >
                    <Icon
                      icon={editMode ? "carbon:close" : "flowbite:edit-outline"}
                      className=" text-gray-400 text-2xl"
                    />
                  </button>
                  {/* <td className="px-2 py-1"></td> */}
                </tr>
              </thead>

              <tbody className="divide-y-1">
                {items?.map((item) => {
                  return (
                    <tr key={item?.no}>
                      <td className="px-2 py-2 text-sm">
                        {(item as any)?.item_name}
                      </td>

                      <td className="px-2 py-2 w-[25ch]">
                        <TextInputField
                          id={"qty"}
                          values={{
                            qty: items?.find(
                              (fitem) => fitem.item_name == item?.item_name
                            )?.qty,
                          }}
                          errors={{}}
                          handleBlur={() => {}}
                          handleChange={(
                            event: React.ChangeEvent<HTMLInputElement>
                          ) => {
                            setItems((prev) =>
                              prev.map((value) =>
                                value?.item_name === item?.item_name
                                  ? {
                                      ...value,
                                      qty: parseFloat(
                                        event?.target?.value?.trim() == ""
                                          ? "0"
                                          : event?.target?.value
                                      ),
                                    }
                                  : value
                              )
                            );
                          }}
                          placeholder={"1"}
                          label={""}
                          touched={{}}
                          extraClassName="w-full h-8"
                          disabled={!editMode}
                        />
                      </td>
                      <td className="px-2 py-2 w-[25ch]">
                        <TextInputField
                          id={"rate"}
                          values={{
                            rate: items?.find(
                              (fitem) => fitem.item_name == item?.item_name
                            )?.rate,
                          }}
                          errors={{}}
                          handleBlur={() => {}}
                          handleChange={(
                            event: React.ChangeEvent<HTMLInputElement>
                          ) => {
                            setItems((prev) =>
                              prev.map((value) =>
                                value?.item_name === item?.item_name
                                  ? {
                                      ...value,
                                      rate: parseFloat(
                                        event?.target?.value?.trim() == ""
                                          ? "0"
                                          : event?.target?.value
                                      ),
                                    }
                                  : value
                              )
                            );
                          }}
                          placeholder={"1"}
                          label={""}
                          touched={{}}
                          extraClassName="w-full h-8"
                          disabled={!editMode}
                        />
                      </td>
                      <td className="px-2 text-center w-[2ch]">
                        <button onClick={() => {}} className="w-full grid">
                          <Icon
                            icon="solar:trash-bin-trash-broken"
                            className="m-auto text-lg hover:text-red-600 duration-700"
                          />
                        </button>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
        <div className=" grid grid-cols-3 gap-3 col-span-2 ">
          <div className="col-span-1"></div>
          <Button
            className="bg-white border-[0.85px] hover:bg-red-100 border-red-600 text-red-600 rounded-3xl"
            onClick={(e) => {
              e.preventDefault();
              // onClose(false);
              handleClose();
            }}
          >
            Cancel
          </Button>
          <Button
            disabled={CreatePurchaseInvoicePending || CreateSalesInvoicePending}
            className="bg-primary-green text-white hover:bg-primary-green/hover flex items-center gap-2 rounded-3xl"
            onClick={(e) => {
              e.preventDefault();
              form.handleSubmit();
            }}
          >
            {(CreatePurchaseInvoicePending || CreateSalesInvoicePending) && (
              <Icon icon={"eos-icons:loading"} className="text-[1rem]" />
            )}
            Create Invoice
          </Button>
        </div>
      </div>

      <div className="bg-ash rounded-lg p-4">
        <h4 className="text-[1.3rem] font-medium border-b">Preview</h4>

        <div className="grid grid-cols-2 my-10 gap-4">
          <PreviewTab label="Due Date" value={form.values.payment_due_date} />
          <PreviewTab label="Billed To" value={form.values.party} />
          <PreviewTab
            label="Subject"
            value={`${
              invoiceType == "purchase" ? "Purchase Invoice" : "Sales Invoice"
            } for ${form.values.party}`}
          />
        </div>
        <div className="mt-6">
          <div className="grid grid-cols-5 bg-gray-200 px-2 py-2 rounded-t-md uppercase text-[0.7rem] font-medium text-gray-500">
            <p className="col-span-2">Item</p>
            <p>Quantity</p>
            <p>Unit Price</p>
            <p>Amount</p>
          </div>

          {isEmpty(items) ? (
            <div className="w-full text-center mt-4">
              <p>No items</p>
            </div>
          ) : (
            <div>
              {items?.map((item) => {
                return (
                  <div
                    key={item?.item_name}
                    className="grid grid-cols-5 px-4 border-b py-2 text-[0.8rem]"
                  >
                    <p className="col-span-2 ">{item?.item_name}</p>
                    <p>{item?.qty}</p>
                    <p>{parseToMoney(item?.rate)}</p>
                    <p>{parseToMoney(Number(item?.rate * item?.qty))}</p>
                  </div>
                );
              })}
            </div>
          )}
        </div>

        <div className="flex items-center justify-end mt-10">
          <div className="gap-10 flex font-semibold">
            <h2 className="">Total Amount</h2>
            <p className="text-gray-500">
              GHS{" "}
              {parseToMoney(
                items.reduce(
                  (acc, curr) => Number(curr?.rate * curr?.qty) + acc,
                  0
                )
              )}
            </p>
          </div>
        </div>
      </div>

      <CustomModal
        size="2xl"
        placement="right"
        radius="none"
        isOpen={addSupplierModal.isOpen}
        classNames={{
          header: "p-0 text-white",
          closeButton: "text-white hover:text-black",
          body: "px-6 pt-6",
        }}
        header={
          <>
            <div className="bg-secondary px-6 p-8">
              <div>New Supplier</div>
              <p className="text-sm font-light">
                Fill out the following requirements.
              </p>
            </div>
          </>
        }
        onOpenChange={addSupplierModal.onOpenChange}
        body={
          <AddSupplierModalBody
            onClose={() => {
              addSupplierModal.onClose();
            }}
          />
        }
      />

      <CustomModal
        size="2xl"
        placement="right"
        radius="none"
        isOpen={addItemsModal.isOpen}
        classNames={{
          header: "p-0 text-white",
          closeButton: "text-white hover:text-black",
          body: "px-6 pt-6",
        }}
        header={
          <>
            <div className="bg-secondary px-6 p-8">
              <div>New Item</div>
              <p className="text-sm font-light">
                Fill out the following requirements.
              </p>
            </div>
          </>
        }
        onOpenChange={addItemsModal.onOpenChange}
        body={
          <>
            <AddItemModalBody {...addItemsModal} />
          </>
        }
      />

      <CustomModal
        size="2xl"
        placement="right"
        radius="none"
        classNames={{
          header: "p-0 text-white",
          closeButton: "text-white hover:text-black",
          body: "px-6 pt-6",
        }}
        isOpen={addPartyModal.isOpen}
        header={
          <>
            <div className="bg-secondary px-6 p-8">
              <div>New Payment Party</div>
              <p className="text-sm font-light">
                Fill out the following requirements.
              </p>
            </div>
          </>
        }
        onOpenChange={addPartyModal.onOpenChange}
        body={
          <AddPartyModalBody
            onClose={() => {
              addPartyModal.onClose();
            }}
          />
        }
      />
    </div>
  );
};

function PreviewTab({ label, value }: { label: string; value: string }) {
  return (
    <div className="font-medium">
      <p className="text-gray-400">{label}</p>
      <p>{String(value).trim() == "" ? "-" : value}</p>
    </div>
  );
}
export default InvoicePage;
