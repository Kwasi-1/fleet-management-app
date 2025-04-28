import LogoComponent from "@/components/logo.component";
import AutoComplete from "@/components/shared/form/AutoComplete";
import CustomDatePicker from "@/components/shared/form/CustomDatePicker";
import TextInputField from "@/components/shared/form/TextInputField";
import { UploadFileComponent } from "@/components/shared/text-field";
import { Button } from "@/components/ui/button";
import { CreateDocument, ValidateDocument } from "@/lib/api/mutations.global";
import { GetDocument } from "@/lib/api/queries.global";
import { Icon } from "@iconify/react/dist/iconify.js";
import { useMutation, useQuery } from "@tanstack/react-query";
import { isAxiosError } from "axios";
import { useFormik } from "formik";
import { useCallback, useEffect, useState } from "react";
import { toast } from "sonner";
import { GENERATE_TODAYS_DATE } from "../_pages/general-ledger/misc";
import * as Yup from "yup";

interface Props {
  payment_type: "Pay" | "Receive";
  invoice_name: string;
  onClose: (refetch: boolean) => void;
  invoice_type: "Sales Invoice" | "Purchase Invoice";
}
const MakePaymentEntryModalModal = ({
  payment_type,
  invoice_name,
  onClose,
  invoice_type,
}: Props) => {
  const [file, setFile] = useState<File>();
  const [editMode, setEditMode] = useState(false);
  const [invoiceData, setInvoiceData] = useState<any>({});
  const {
    data: InvoiceData,
    isFetching,
    isError,
  } = useQuery({
    queryKey: ["invoice-data-for-payment-entry"],
    queryFn: () =>
      GetDocument({
        url: `/accounting/get/${invoice_type
          .toLowerCase()
          .split(" ")
          .join("-")}`,
        name: invoice_name,
      }),
    refetchOnWindowFocus: false,
    // enabled: invoice_type == 'Purchase Invoice',
  });

  const {
    data: SalesInvoiceData,
    isFetching: FetchingSalesInvoice,
    // isError: SalesInvoiceError,
  } = useQuery({
    queryKey: ["sales-invoice-payment-entries"],
    queryFn: () =>
      GetDocument({
        url: `/accounting/get/payment-entry`,
        name: invoice_name,
        other: {
          invoice_name,
        },
      }),
    enabled: invoice_type == "Sales Invoice",
    refetchOnWindowFocus: false,
  });

  const fields = [
    {
      id: "posting_date",
      type: "date",
      label: "Posting Date",
      placeholder: "",
    },

    {
      id: "party",
      type: "text",
      label: `${
        invoice_type == "Purchase Invoice" ? "Supplier" : "Party"
      } Name`,
      placeholder: "e.g. Cepodek",
      disabled: true,
    },
    {
      id: "mode_of_payment",
      type: "auto_complete",
      label: "Mode of Payment",
      placeholder: "e.g. Momo",
      doctype: "Mode of Payment",
      reference_doctype: "Payment Entry",
      filters: {},
    },
    {
      id: "paid_amount",
      type: "text",
      label: "Amount",
      placeholder: "e.g 2000",
    },

    ...(invoice_type == "Purchase Invoice"
      ? [
          {
            id: "paid_from",
            type: "auto_complete",
            label: "Account Paid From",
            placeholder: "e.g. Cash-Act",
            doctype: "Account",
            reference_doctype: "Payment Entry",
            filters: {
              account_type: ["in", ["Bank", "Cash"]],
              is_group: 0,
              company: "CCT FUND-",
            },
          },
        ]
      : []),
  ];

  const PaymentEntrySchema = Yup.object().shape({
    posting_date: Yup.string().required("Posting date is required"),
    mode_of_payment: Yup.string().required("Mode of payment is required"),
    party_type: Yup.string(),
    party: Yup.string(),
    payment_due_date: Yup.string(),
    paid_amount: Yup.number()
      .transform((value) => (isNaN(value) ? undefined : Number(value)))
      .required("Amount is required")
      .min(0, "Amount must be greater than 0")
      .test(
        "max-outstanding",
        "Amount cannot exceed outstanding balance",
        function (value) {
          return value <= Number(invoiceData?.outstanding_amount);
        }
      ),
    paid_from: Yup.string(),
  });

  const { ...form } = useFormik({
    initialValues: {
      posting_date: GENERATE_TODAYS_DATE(),
      mode_of_payment: "",
      party_type: "",
      party: "",
      payment_due_date: "",
      paid_amount: "",
      paid_from: "",
    },
    validationSchema: PaymentEntrySchema,
    onSubmit: async (values) => {
      if (payment_type == "Pay") {
        validate
          .mutateAsync({
            url: "/validate",
            payload: {
              doctype: "Account",
              docname: values.paid_from,
              fields: ["account_currency", "name"],
            },
          })
          .then((data) => {
            const formData = new FormData();

            Object.entries({
              payment_type: payment_type,
              party: values.party,
              party_type:
                invoice_type == "Sales Invoice" ? "Customer" : "Supplier",
              paid_from_account_currency: data?.data?.message?.account_currency,
              paid_from: data?.data?.message?.name,
              posting_date: values.posting_date,
              mode_of_payment: values.mode_of_payment,
              paid_amount: Number(values.paid_amount),
              received_amount: Number(values.paid_amount),
              paid_to: invoiceData?.credit_to,
              reference_doctype: invoice_type,
              reference_name: invoiceData?.name,
              allocated_amount: Number(values.paid_amount),
            }).forEach(([key, value]) => {
              formData.append(key, String(value));
            });

            formData.append("file", file);
            toast.promise(
              CreatePaymentEntry({
                url: "/accounting/create/payment-entry-with-attarchment",
                payload: formData,
                header: {
                  "Content-Type": "multipart/form-data",
                },
              }),
              {
                loading: "Creating Payment Entry ",
                success: "Payment Entry created succesfully",
              }
            );
          });
      }

      if (payment_type == "Receive") {
        const formData = new FormData();
        Object.entries({
          payment_type: payment_type,
          party: values.party,
          party_type: invoice_type == "Sales Invoice" ? "Customer" : "Supplier",
          posting_date: values.posting_date,
          mode_of_payment: values.mode_of_payment,
          paid_amount: Number(values.paid_amount),
          received_amount: Number(values.paid_amount),
          paid_to: SalesInvoiceData?.data?.paid_to,
          reference_doctype: invoice_type,
          reference_name: invoiceData?.name,
          allocated_amount: Number(values.paid_amount),
        }).forEach(([key, value]) => {
          formData.append(key, String(value));
        });

        formData.append("file", file);
        toast.promise(
          CreatePaymentEntry({
            url: "/accounting/create/payment-entry-with-attarchment",
            payload: formData,
            header: {
              "Content-Type": "multipart/form-data",
            },
          }),
          {
            loading: "Creating Payment Entry ",
            success: "Payment Entry created succesfully",
          }
        );
      }
    },
  });
  const {
    isPending: CreatePaymentEntryPending,
    mutateAsync: CreatePaymentEntry,
  } = useMutation({
    mutationKey: ["create-payment-entry"],
    mutationFn: CreateDocument,
    onError: (data: any) => {
      if (isAxiosError) {
        toast.error(data?.response?.data?.message ?? "An error occured");
      }
    },
    onSettled: () => {
      onClose(true);
    },
  });

  const validate = useMutation({
    mutationFn: ValidateDocument,
    onError(error) {
      console.log(error);
      toast.error("An error occured!");
      onClose(false);
    },
  });
  const handleSelectChange = useCallback(
    (id: string, value: string) => {
      form.setFieldValue(id, value);
    },
    [form]
  );

  useEffect(() => {
    if (!isFetching && !isError) {
      setInvoiceData(InvoiceData?.data);
      if (invoice_type == "Sales Invoice") {
        form.setFieldValue("party", InvoiceData?.data?.customer);
      }
      if (invoice_type == "Purchase Invoice") {
        form.setFieldValue("party", InvoiceData?.data?.supplier);
      }

      form.setFieldValue("paid_amount", invoiceData.outstanding_amount);
    }
  }, [isFetching, isError, invoiceData]);

  if (FetchingSalesInvoice || isFetching) return <LogoComponent />;

  return (
    <div className="pb-6 flex flex-col justify-between h-full">
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
                  disabled={field.disabled}
                  {...form}
                  extraClassName="w-full"
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

        <div className="mt-4">
          <UploadFileComponent
            label={"Proof of payment"}
            name={file?.name}
            required={false}
            onremove={() => {
              setFile(null);
            }}
            value={file}
            url={undefined}
            error={undefined}
            onchange={(event) => {
              setFile(event.target.files[0]);
            }}
          />
        </div>

        {FetchingSalesInvoice || isFetching ? (
          <LogoComponent />
        ) : (
          <div className="col-span-2">
            <p className="font-extralight text-[0.9rem] text-ash-text mb-1">
              Invoice
            </p>
            <div className="mt-1 border-b border-collapse rounded-md ">
              <table className=" w-full text-xs ">
                <thead>
                  <tr className=" border-b-1 border-gray-300  font-semibold relative">
                    <td className="px-2 py-3">Invoice Name</td>
                    <td className="px-2 py-3">Grand Total (GHS)</td>
                    <td className="px-2 py-3">Outstanding (GHS)</td>
                    <td className="px-2 py-3 flex gap-x-1 h-full items-center justify-between ">
                      <div>Allocated (GHS)</div>
                    </td>
                    <button
                      type="button"
                      onClick={() => setEditMode(!editMode)}
                      className="h-full absolute right-0 top-0"
                    >
                      <Icon
                        icon={
                          editMode ? "carbon:close" : "flowbite:edit-outline"
                        }
                        className=" text-gray-400 text-2xl"
                      />
                    </button>
                    {/* <td className="px-2 py-1"></td> */}
                  </tr>
                </thead>
                <tbody className="divide-y-1">
                  <tr>
                    <td className="px-2 py-2 text-sm">{invoiceData?.name}</td>
                    <td className="px-2 py-2 w-[25ch]">
                      {Number(invoiceData?.grand_total).toFixed(2)}
                    </td>
                    {/* outstanding_amount
                     */}
                    <td className="px-2 py-2 w-[25ch]">
                      {Number(invoiceData?.outstanding_amount).toFixed(2)}
                    </td>
                    <td className="px-2 py-2 w-[25ch]">
                      <TextInputField
                        id={"paid_amount"}
                        {...form}
                        placeholder={"1"}
                        label={""}
                        extraClassName="w-full h-8"
                        disabled={!editMode}
                      />
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        )}
      </div>

      <div className=" grid grid-cols-2 gap-3 col-span-2 mt-5">
        <Button
          className="bg-white border-[0.85px] hover:bg-red-100 border-red-600 text-red-600 rounded-xl"
          onClick={(e) => {
            e.preventDefault();
            onClose(false);
          }}
        >
          Cancel
        </Button>
        <Button
          disabled={
            CreatePaymentEntryPending || Number(form.values.paid_amount) <= 0
          }
          className="bg-primary-green text-white hover:bg-primary-green/hover flex items-center gap-2 rounded-xl"
          onClick={(e) => {
            e.preventDefault();
            form.handleSubmit();
          }}
        >
          {CreatePaymentEntryPending && <Icon icon={"eos-icons:loading"} />}
          Proceed
        </Button>
      </div>
    </div>
  );
};

// const MAP_NAMING_SERIES_TO_PARTY_TYPE = (naming_series: string) => {
//   const prefix = naming_series.split('-')[0];

//   switch (prefix) {
//     case 'CUST':
//       return 'Customer';
//   }
// };

export default MakePaymentEntryModalModal;
