import { Button } from "@/components/ui/button";
import { Icon } from "@iconify/react/dist/iconify.js";
import { useDisclosure } from "@nextui-org/react";
import { useFormik } from "formik";
import { isEmpty } from "lodash";
import React, { useCallback, useState } from "react";
import { toast } from "sonner";
import * as Y from "yup";
import { useNavigate, useSearchParams } from "react-router-dom";
import InputField from "../common/InputField";
import SelectField from "../common/SelectField";
import SimpleSelect from "./SimpleSelect";
import TextInputField from "../common/TextInputField";
import BackButton from "../common/BackButton";

type TInvoice = "purchase" | "sales";

interface OrderForm {
  orderNumber: string;
  scheduleDate: string;
  status: string;
  customerName: string;
  customerEmail: string;
  customerPhone: string;
  invoiceType: string;
  sourceWarehouse: string;
  destinationAddress: string;
  billingAddress: string;
  paymentId: string;
  paymentDate: string;
  postingDate: string;
  paymentAmount: string;
  paymentCurrency: string;
  items: {
    name: string;
    unit: string;
    unitPrice: string;
    quantity: string;
  }[];
}

const CreateInvoice = () => {
  const navigate = useNavigate();

  const [params] = useSearchParams();
  const hasTypeParam = params.has("type");
  const iType = hasTypeParam ? params.get("type") : "purchase";
  const [invoiceType] = useState<TInvoice>(iType as TInvoice);

  const isInvoiceTypeDisabled = hasTypeParam;
  const orderType = invoiceType === "sales" ? "Sales Order" : "Purchase Order";

  const formSchema = Y.object().shape({
    posting_date: Y.string().required("Posting Date is required"),
    payment_due_date: Y.string().required("Payment Due Date is required"),
    party: Y.string().required(
      `${invoiceType == "purchase" ? "Supplier" : "Party"} is required`
    ),
    items: Y.string().required("At least one item has to be selected"),
  });

  const [orderForm, setOrderForm] = useState<OrderForm>({
    orderNumber: "",
    scheduleDate: "",
    status: "",
    customerName: "",
    customerEmail: "",
    customerPhone: "",
    sourceWarehouse: "",
    destinationAddress: "",
    postingDate: new Date().toISOString().split("T")[0],
    billingAddress: "",
    paymentId: "",
    invoiceType: hasTypeParam ? orderType : "Purchase Order",
    paymentDate: "",
    paymentAmount: "",
    paymentCurrency: "",
    items: [],
  });

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setOrderForm((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

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

      toast.promise(
        new Promise((resolve) => {
          setTimeout(() => {
            resolve("Success");
            console.log("Form submitted with values:", {
              ...values,
              items: items,
            });
          }, 1500);
        }),
        {
          loading: `Creating ${
            invoiceType === "purchase" ? "Purchase" : "Sales"
          } Invoice`,
          success: `${
            invoiceType === "purchase" ? "Purchase" : "Sales"
          } invoice created successfully`,
          error: `An error occurred creating ${
            invoiceType === "purchase" ? "purchase" : "sales"
          } invoice`,
        }
      );
    },
  });

  const addItemsModal = useDisclosure();
  const [items, setItems] = useState<any[]>([]);
  const [editMode, setEditMode] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSelectChange = useCallback(
    (id: string, value: string) => {
      form.setFieldValue(id, value);
    },
    [form]
  );

  function handleClose() {
    navigate(
      `/dashboard/accounting/masters/${
        invoiceType == "purchase" ? "account-payable" : "account-receivable"
      }`
    );
  }

  const availableItems = [
    { name: "Laptop", unitPrice: 1200 },
    { name: "Monitor", unitPrice: 300 },
  ];

  const handleItemSelect = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const value = e.target.value;
    if (!value) return;

    form.setFieldValue("items", value);

    const selectedItem = availableItems.find((item) => item.name === value);
    if (selectedItem) {
      const newItem = {
        item_name: selectedItem.name,
        qty: 1,
        rate: selectedItem.unitPrice,
        no: items.length + 1,
      };
      setItems((prev) => [...prev, newItem]);
    }

    // Reset the select field
    e.target.value = "";
  };

  return (
    <div className="flex gap-6 h-[90vh] mt-5">
      <div className="flex-[0.9] flex justify-between flex-col tracking-tight">
        <div>
          <BackButton />

          <h4 className="font-medium text-[1.2rem] mb-2 tracking-tighter">
            Invoice Details
          </h4>

          <form action="#" className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <InputField
              label="Posting Date"
              name="postingDate"
              type="date"
              value={orderForm.postingDate}
              onChange={handleInputChange}
            />

            <InputField
              label="Schedule Date"
              name="scheduleDate"
              type="date"
              value={orderForm.scheduleDate}
              onChange={handleInputChange}
            />

            <SelectField
              label="Invoice Type"
              name="invoiceType"
              value={orderForm.invoiceType}
              options={["Purchase Order", "Sales Order"]}
              onChange={(e) =>
                handleSelectChange(e.target.name, e.target.value)
              }
              disabled={isInvoiceTypeDisabled}
            />
            <InputField
              label="Customer Name"
              name="customerName"
              type="email"
              placeholder="customer@example.com"
              value={orderForm.customerName}
              onChange={handleInputChange}
            />

            <InputField
              label="Customer Email"
              name="customerEmail"
              type="email"
              placeholder="customer@example.com"
              value={orderForm.customerEmail}
              onChange={handleInputChange}
            />

            <InputField
              label="Customer Phone"
              name="customerPhone"
              type="tel"
              placeholder="e.g., 020XXXXXXX"
              value={orderForm.customerPhone}
              onChange={handleInputChange}
            />

            <InputField
              label="Source Warehouse"
              name="sourceWarehouse"
              placeholder="Cepodek"
              value={orderForm.sourceWarehouse}
              onChange={handleInputChange}
            />

            <InputField
              label="Destination Address"
              name="destinationAddress"
              placeholder="Oyarifa Warehouse"
              value={orderForm.destinationAddress}
              onChange={handleInputChange}
            />
          </form>

          <div className="mt-6">
            <h4 className="font-medium text-[1.2rem] mb-2">Items (Services)</h4>

            {/* select item field */}
            <SimpleSelect
              label="Select Item"
              name="selectedItem"
              value=""
              options={[...availableItems.map((item) => item.name)]}
              onChange={handleItemSelect}
            />

            <p
              className="text-[#619B7D] text-[0.7rem] mt-1 cursor-pointer"
              onClick={(e) => {
                e.preventDefault();
                addItemsModal.onOpen();
              }}
            >
              + Add new item (service)
            </p>
          </div>

          <div className="mt-4 border-b border-collapse rounded-md">
            <table className="w-full text-xs">
              <thead className="text-default-500">
                <tr className="border-b-1 border-gray-300 font-semibold relative">
                  <td className="px-2 py-3">Item Name</td>
                  <td className="px-2 py-3">Qty</td>
                  <td className="px-2 py-3">Rate</td>
                  <button
                    type="button"
                    title={editMode ? "Close Edit Mode" : "Edit Items"}
                    onClick={() => setEditMode(!editMode)}
                    className="h-full absolute right-0 top-0"
                  >
                    <Icon
                      icon={editMode ? "carbon:close" : "flowbite:edit-outline"}
                      className="text-gray-400 text-2xl"
                    />
                  </button>
                </tr>
              </thead>

              <tbody className="divide-y-1">
                {items.map((item) => (
                  <tr key={item.no}>
                    <td className="px-2 py-2 text-sm">{item.item_name}</td>
                    <td className="px-2 py-2 w-[25ch]">
                      <TextInputField
                        id={"qty"}
                        values={{ qty: item.qty }}
                        errors={{}}
                        handleBlur={() => {}}
                        handleChange={(
                          e: React.ChangeEvent<HTMLInputElement>
                        ) => {
                          setItems((prev) =>
                            prev.map((i) =>
                              i.no === item.no
                                ? { ...i, qty: parseFloat(e.target.value) || 0 }
                                : i
                            )
                          );
                        }}
                        placeholder="1"
                        label=""
                        touched={{}}
                        extraClassName="w-full h-8"
                        disabled={!editMode}
                      />
                    </td>
                    <td className="px-2 py-2 w-[25ch]">
                      <TextInputField
                        id={"rate"}
                        values={{ rate: item.rate }}
                        errors={{}}
                        handleBlur={() => {}}
                        handleChange={(
                          e: React.ChangeEvent<HTMLInputElement>
                        ) => {
                          setItems((prev) =>
                            prev.map((i) =>
                              i.no === item.no
                                ? {
                                    ...i,
                                    rate: parseFloat(e.target.value) || 0,
                                  }
                                : i
                            )
                          );
                        }}
                        placeholder="1"
                        label=""
                        touched={{}}
                        extraClassName="w-full h-8"
                        disabled={!editMode}
                      />
                    </td>
                    <td className="px-2 text-center w-[2ch]">
                      <button
                        type="button"
                        title="Delete item"
                        onClick={() =>
                          setItems((prev) =>
                            prev.filter((i) => i.no !== item.no)
                          )
                        }
                        className="w-full grid"
                      >
                        <Icon
                          icon="solar:trash-bin-trash-broken"
                          className="m-auto text-lg hover:text-red-600 duration-700"
                        />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        <div className="grid grid-cols-3 gap-3 col-span-2 mt-4 pb-4">
          <div className="col-span-1"></div>
          <Button
            className="bg-white border-[0.85px] hover:bg-red-100 border-red-600 text-red-600 rounded-3xl"
            onClick={(e) => {
              e.preventDefault();
              handleClose();
            }}
          >
            Cancel
          </Button>
          <Button
            disabled={isSubmitting}
            className="bg-[#619B7D] text-white hover:bg-[#619B7D]/70 flex items-center gap-2 rounded-3xl"
            onClick={(e) => {
              e.preventDefault();
              setIsSubmitting(true);
              form.handleSubmit();
              setTimeout(() => setIsSubmitting(false), 1500);
            }}
          >
            {isSubmitting && (
              <Icon icon={"eos-icons:loading"} className="text-[1rem]" />
            )}
            Create Invoice
          </Button>
        </div>
      </div>

      {/* Updated Preview Section */}
      <div className="flex-[1] bg-gray-200/30 rounded-lg p-4 text-sm font-[300] tracking-tight">
        <h4 className="text-[1.3rem] font-medium tracking-tighter border-b">
          Preview
        </h4>

        <div className="grid grid-cols-2 my-10 gap-4">
          <PreviewTab label="Posting Date" value={orderForm.postingDate} />
          <PreviewTab label="Schedule Date" value={orderForm.scheduleDate} />
          <PreviewTab label="Invoice Type" value={orderForm.invoiceType} />
          <PreviewTab label="Customer Name" value={orderForm.customerName} />
          <PreviewTab label="Customer Email" value={orderForm.customerEmail} />
          <PreviewTab label="Customer Phone" value={orderForm.customerPhone} />
          <PreviewTab
            label="Source Warehouse"
            value={orderForm.sourceWarehouse}
          />
          <PreviewTab
            label="Destination Address"
            value={orderForm.destinationAddress}
          />
          <PreviewTab label="Due Date" value={form.values.payment_due_date} />
          <PreviewTab
            label={invoiceType === "purchase" ? "Supplier" : "Customer"}
            value={form.values.party}
          />
          <PreviewTab
            label="Subject"
            value={`${
              invoiceType == "purchase" ? "Purchase Invoice" : "Sales Invoice"
            } for ${form.values.party || "New Customer"}`}
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
              <p>No items added yet</p>
            </div>
          ) : (
            <div>
              {items.map((item) => (
                <div
                  key={item.no}
                  className="grid grid-cols-5 px-4 border-b py-2 text-[0.8rem]"
                >
                  <p className="col-span-2">{item.item_name}</p>
                  <p>{item.qty}</p>
                  <p>{parseToMoney(item.rate)}</p>
                  <p>{parseToMoney(Number(item.rate * item.qty))}</p>
                </div>
              ))}
            </div>
          )}
        </div>

        <div className="flex items-center justify-end mt-10">
          <div className="gap-10 flex font-semibold">
            <h2>Total Amount</h2>
            <p className="text-gray-500">
              GHS
              {items.length > 0
                ? parseToMoney(
                    items.reduce(
                      (acc, curr) => Number(curr.rate * curr.qty) + acc,
                      0
                    )
                  )
                : "0.00"}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

interface PreviewTabProps {
  label: string;
  value: string | number | undefined;
}

function PreviewTab({ label, value }: PreviewTabProps) {
  return (
    <div className="font-medium">
      <p className="text-gray-400 font-thin text-[14px]">{label}</p>
      <p>
        {value === undefined || value === null || String(value).trim() === ""
          ? "-"
          : typeof value === "number"
          ? parseToMoney(value)
          : value}
      </p>
    </div>
  );
}

function parseToMoney(amount: number): string {
  return amount.toFixed(2).replace(/\d(?=(\d{3})+\.)/g, "$&,");
}

export default CreateInvoice;
