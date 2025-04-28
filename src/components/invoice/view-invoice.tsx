import LogoComponent from "@/components/logo.component";
import { GetDocument, listDocuments } from "@/lib/api/queries.global";
import { parseToMoney } from "@/utils/helpers";
import { useMutation, useQuery } from "@tanstack/react-query";
import { capitalize, isEmpty } from "lodash";
import React, { useEffect, useRef, useState } from "react";
import {
  cn,
  Spinner,
  Table,
  TableBody,
  TableCell,
  TableColumn,
  TableHeader,
  TableRow,
  Pagination,
  useDisclosure,
  Button as KButton,
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownTrigger,
} from "@nextui-org/react";
import { useNavigate, useParams } from "react-router-dom";
import { IPaymentEntry } from "@/pages/[accounting]/home/_components/transactions";
import { format } from "date-fns";
import StatusText from "@/components/shared/status.text";
import { toast } from "sonner";
import { Icon } from "@iconify/react/dist/iconify.js";
import { Button } from "@/components/ui/button";
import { PDFDownloadLink, Document, Page } from "@react-pdf/renderer";
import InvoicePdfTemplate from "@/pages/[accounting]/pdf-templates/invoice";
import CustomModal from "@/components/shared/modal";
import MakePaymentEntryModalModal from "../../_shared/payment-entry";
import { apiClient } from "@/services/api.client";
import { variables } from "@/utils/env";
import TextInputField from "@/components/shared/form/TextInputField";
import ApprovalModal from "@/pages/[accounting]/expense&cash-management/_component/approval-modal";
import { More } from "iconsax-react";
import { useSelector } from "react-redux";
import { RootState } from "@/store/store";
import useFbooksSasToken from "@/hooks/useFbooksSASToken";
// import { useReactToPrint } from 'react-to-print';

const columns = [
  // { name: 'PARTY', uid: 'party', sortable: true },
  { name: "AMOUNT", uid: "paid_amount", sortable: true },
  // { name: 'TYPE', uid: 'payment_type', sortable: true },
  { name: "DATE", uid: "created_at", sortable: true },
  { name: "Proof of payment", uid: "custom_payment_proof", sortable: true },
  { name: "STATUS", uid: "status", sortable: true },
  { name: "ACTIONS", uid: "actions" },
];
const ViewInvoice = () => {
  const nav = useNavigate();
  const {
    organization_details: { logo_url },
  } = useSelector((state: RootState) => state["org-details"]);
  const { data: SASToken } = useFbooksSasToken();
  const [params, setParams] = React.useState({
    limit: 16,
    count: 10,
    page: 1,
  });
  const { name } = useParams();
  function invoiceType() {
    const t = name.split("-")[1];

    return t.toLocaleLowerCase() == "pinv" ? "purchase" : "sales";
  }
  const {
    data: InvoiceData,
    isFetching,
    isError,
  } = useQuery({
    queryKey: ["get-invoice"],
    queryFn: () =>
      GetDocument({
        url: `/accounting/get/${invoiceType()}-invoice`,
        name,
      }),
    refetchOnWindowFocus: false,
  });

  useEffect(() => {
    if (isError) {
      toast.error("An error occurred while fetching data");
      nav("/dashboard/accounting/masters");
    }
  }, [isError]);
  const approvalModalControl = useDisclosure();
  const [imageSrc, setImageSrc] = React.useState(undefined);

  React.useEffect(() => {
    if (SASToken) {
      fetch(String(logo_url + SASToken), { method: "GET" })
        .then((response) => response.blob())
        .then(async (blob) => {
          // const source = URL.createObjectURL(blob);
          const d = await readAsDataURL(blob);
          setImageSrc(d);
        });
    }
  }, [SASToken]);
  const {
    data: Payables,
    isPending,
    isRefetching,
    isSuccess,
    refetch,
  } = useQuery({
    queryKey: [
      "payment-entries-for-invoice",
      params.page,
      params.limit,
      approvalModalControl.isOpen,
    ],
    queryFn: () =>
      listDocuments({
        start: (params.page - 1) * params.limit,
        limit: params.limit,
        url: "/accounting/list/payment-entries",
        filters: [["Payment Entry Reference", "reference_name", "=", name]],
      }),
    refetchOnWindowFocus: false,
  });

  const { mutateAsync: sendEmail } = useMutation({
    mutationFn: (data: any) =>
      apiClient({
        url: variables().HR_ACCOUNTING_BASE_URL + "/share-document",
        method: "POST",
        data: data,
      }),
  });

  const [actionModalData, setActionModalData] = useState<{
    invoice_id: string;
    mode: "approve" | "cancel";
  }>({
    invoice_id: "",
    mode: "cancel",
  });

  const renderCell = React.useCallback(
    (record: IPaymentEntry, columnKey: React.Key): any => {
      const cellValue = record?.[columnKey as keyof IPaymentEntry];
      switch (columnKey) {
        case "invoiced_amount":
          return (
            <div className="flex flex-col text-[0.8rem]">
              <p className="font-light text-small capitalize">
                ¢ {Number(record?.paid_amount).toFixed(2)}
              </p>
            </div>
          );
        case "payment_type":
          return (
            <div className="flex flex-col text-default-500 text-[0.8rem] ">
              <p
                className={cn(
                  "font-normal",
                  cellValue != "Pay" ? "text-primary-green" : "text-[#E80054]"
                )}
              >
                {cellValue as string}
              </p>
            </div>
          );
        case "remarks":
          return (
            <div className="flex flex-col text-default-500 ">
              <p className="font-light text-[0.8rem] ">{cellValue as string}</p>
            </div>
          );
        case "paid_amount":
          return (
            <div className="flex flex-col">
              <p className="font-light capitalize text-[0.8rem]">
                ¢ {parseToMoney(record?.paid_amount)}
              </p>
            </div>
          );

        case "created_at":
          return (
            <div className="flex flex-col">
              <p className="font-light text-[0.8rem] capitalize">
                {format(new Date(record?.posting_date), "dd/MM/yyyy")}
              </p>
            </div>
          );

        case "custom_payment_proof":
          return (
            <div className="flex flex-col text-default-500 ">
              <p className="font-light text-[0.8rem] ">
                <a
                  target="_blank"
                  href={
                    cellValue
                      ? `https://charge-express.foundry-platform.app/${cellValue}`
                      : "#"
                  }
                >
                  {" "}
                  {(cellValue as string) || "-"}
                </a>
              </p>
            </div>
          );

        case "status":
          return (
            <StatusText textClassName="text-[0.8rem]" text={record.status} />
          );

        case "actions":
          return (
            <div className="relative flex justify-end items-center gap-2">
              <Dropdown>
                <DropdownTrigger>
                  <KButton
                    isIconOnly
                    size="sm"
                    variant="light"
                    className="rotate-90"
                  >
                    <More size="18" color="#000000" variant="Broken" />
                  </KButton>
                </DropdownTrigger>
                <DropdownMenu
                  // disabledKeys={['view']}
                  selectionMode="single"
                  onSelectionChange={(k) => {
                    const [value] = Array.from(k);
                    if (value == "cancel") {
                      setActionModalData({
                        invoice_id: record?.name,
                        mode: "cancel",
                      });
                      approvalModalControl.onOpen();
                    }
                  }}
                >
                  {/* <DropdownItem key="view">View</DropdownItem> */}
                  {/* {!['Cancelled', 'Paid', 'Draft'].includes(record.status) && (
                      <DropdownItem key="make_payment">Make Payment</DropdownItem>
                    )} */}

                  <DropdownItem
                    key={"cancel"}
                    classNames={{}}
                    className="text-red-600 hover:bg-red-600 hover:text-white"
                  >
                    Cancel
                  </DropdownItem>
                </DropdownMenu>
              </Dropdown>
            </div>
          );

        default:
          return cellValue || "-";
      }
    },
    []
  );

  const bottomContent = React.useMemo(() => {
    return (
      <div className="py-2 px-2 flex justify-end items-center  pt-2 ">
        <Pagination
          showControls
          classNames={{
            cursor: "bg-foreground text-background bg-secondary",
          }}
          // isDisabled={hasSearchFilter}
          page={params.page}
          total={Math.ceil(params.count / params.limit)}
          variant="light"
          onChange={(page) => setParams({ ...params, page })}
        />
      </div>
    );
  }, [params.page, params.count, isFetching, params.limit, name]);
  useEffect(() => {
    if (isSuccess) {
      setParams((prev) => ({ ...prev, count: Payables?.count }));
    }
  }, [isSuccess]);

  const classNames = React.useMemo(
    () => ({
      // base: ['w-full p-4 rounded-xl bg-ash min-h-[920px] flex'],
      th: [
        "bg-transparent",
        "text-default-500",
        "border-b",
        "border-divider",
        "text-xs",
      ],
      tr: ["hover:cursor-pointer"],
      tbody: [!(isPending || isRefetching) ? "divide-y" : ""],
      td: [
        // changing the rows border radius
        // first
        "group-data-[first=true]/tr:first:before:rounded-none",
        "group-data-[first=true]/tr:last:before:rounded-none",
        // middle
        "group-data-[middle=true]/tr:before:rounded-none",
        // last
        "group-data-[last=true]/tr:first:before:rounded-none",
        "group-data-[last=true]/tr:last:before:rounded-none",
        "py-3 text-[15px]",
      ],
    }),
    [isPending, isRefetching]
  );
  const { data = {} } = Object(InvoiceData);

  const contentRef = useRef<HTMLDivElement>(null);

  const emailModal = useDisclosure();
  const makePaymentEntryModal = useDisclosure();
  const [file, setFile] = useState<Blob>();
  const [email, setEmail] = useState("");
  // function readAsDataURL(file: any) {
  //   return new Promise((resolve, reject) => {
  //     const reader = new FileReader();
  //     reader.onload = () => resolve(reader.result);
  //     reader.onerror = reject;
  //     reader.readAsDataURL(file);
  //   });
  // }
  function readAsDataURL(file: Blob): Promise<string> {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = () => {
        if (typeof reader.result === "string") {
          resolve(reader.result);
        } else {
          reject(new Error("Failed to read file as Data URL"));
        }
      };
      reader.onerror = () => reject(reader.error);
      reader.readAsDataURL(file);
    });
  }
  if (isFetching) return <LogoComponent />;
  return (
    <div>
      <CustomModal
        size="sm"
        radius="md"
        placement="top-center"
        isDismissable={false}
        {...emailModal}
        body={
          <div className="flex flex-col gap-4 py-4">
            <p>
              Enter the email address of the recipients (separated by commas)
            </p>
            <TextInputField
              label=""
              placeholder="example@email.com"
              values={{ email: email }}
              handleChange={(e: any) => setEmail(e.target.value)}
              id={""}
              errors={undefined}
              handleBlur={undefined}
              touched={undefined}
              extraClassName="w-full"
            />
            <Button
              className="bg-primary-green hover:bg-primary-green/hover flex items-center gap-2"
              onClick={() => {
                const formData = new FormData();
                formData.append("file", file);
                formData.append("reciepients", email);
                formData.append("invoice", name);
                formData.append("posting_date", data?.posting_date);
                formData.append("due_date", data?.due_date);
                formData.append(
                  "outstanding_amount",
                  parseToMoney(data?.outstanding_amount)
                );
                toast.promise(sendEmail(formData), {
                  loading: "Sending email...",
                  success: "Email sent successfully",
                  error: "Failed to send email",
                });
                emailModal.onClose();
              }}
            >
              Send Email
              <Icon icon="prime:send" className="text-[19px]" />
            </Button>
          </div>
        }
      />
      <button
        className="flex col-span-full items-center mt-4  gap-2 text-primary-green text-[1.1rem] mb-6 hover:underline"
        onClick={() => {
          nav(
            `/dashboard/accounting/masters/${
              invoiceType() == "purchase"
                ? "account-payable"
                : "account-receivable"
            }`
          );
        }}
      >
        <Icon icon={"hugeicons:arrow-turn-backward"} />
        <p>Back</p>
      </button>
      <div
        className="grid grid-cols-[1fr,0.9fr] min-h-[850px] gap-4"
        ref={contentRef}
      >
        <div className="bg-ash rounded-lg p-4">
          <h4 className="text-[1.3rem] font-medium border-b">
            Invoice #{name}
          </h4>
          <div className="grid grid-cols-2 my-10 gap-4">
            <PreviewTab label="Posting Date" value={data?.posting_date} />
            <PreviewTab label="Due Date" value={data?.due_date} />
            <PreviewTab
              label="Billed To"
              value={
                invoiceType() == "purchase"
                  ? data?.supplier_name
                  : data?.customer_name
              }
            />
            <PreviewTab
              label="Subject"
              value={`${
                invoiceType() == "purchase"
                  ? "Purchase Invoice"
                  : "Sales Invoice"
              } for ${
                invoiceType() == "purchase"
                  ? data?.supplier_name
                  : data?.customer_name
              }`}
            />
            <PreviewTab
              label="Amount Paid"
              value={`GHS ${parseToMoney(
                data?.total - data?.outstanding_amount
              )}`}
            />
            <PreviewTab
              label="Outstanding"
              value={`GHS ${parseToMoney(data?.outstanding_amount)}`}
            />
            <PreviewTab
              label="Status"
              valueComponent={<StatusText text={data?.status} />}
            />
          </div>
          <div className="mt-6">
            <div className="grid grid-cols-5 bg-gray-200 px-2 py-2 rounded-t-md uppercase text-[0.7rem] font-medium text-gray-500">
              <p className="col-span-2">Item</p>
              <p>Quantity</p>
              <p>Unit Price</p>
              <p>Amount</p>
            </div>

            {isEmpty(Array.from(data?.items || [])) ? (
              <div className="w-full text-center mt-4">
                <p>No items</p>
              </div>
            ) : (
              <div>
                {Array.from(data?.items || [])?.map((item: any) => {
                  return (
                    <div
                      key={item?.name}
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
              <h2 className="">Grand Amount</h2>
              <p className="text-gray-500">
                GHS{" "}
                {parseToMoney(
                  Array.from(data?.items).reduce(
                    (acc: number, curr: any) =>
                      Number(curr?.rate * curr?.qty) + acc,
                    0
                  )
                )}
              </p>
            </div>
          </div>
        </div>
        <div className="">
          <div className="border-b flex items-center justify-between pb-3">
            <h4 className="text-[1.3rem] font-medium  pt-4">Payments</h4>

            {data?.outstanding_amount > 0 && (
              <>
                <KButton
                  className="bg-secondary text-background rounded-md"
                  endContent={
                    <Icon icon="fluent:add-24-filled" className="text-[19px]" />
                  }
                  onPress={() => {
                    makePaymentEntryModal.onOpen();
                  }}
                  size="sm"
                >
                  Make Payment
                </KButton>
              </>
            )}
          </div>
          <Table
            className="pt-6"
            isCompact
            removeWrapper
            aria-label="member table"
            color="secondary"
            bottomContent={bottomContent}
            bottomContentPlacement="inside"
            classNames={classNames}
            // sortDescriptor={sortDescriptor}
            // topContent={topContent}
            topContentPlacement="outside"
            selectionMode="none"
            // onSortChange={setSortDescriptor}
          >
            <TableHeader columns={columns}>
              {(column) => (
                <TableColumn
                  key={column?.uid}
                  align={column?.uid === "actions" ? "center" : "start"}
                  allowsSorting={column?.sortable}
                >
                  {column?.name}
                </TableColumn>
              )}
            </TableHeader>
            <TableBody
              emptyContent={"No records found"}
              loadingContent={
                <div className="h-[700px] grid place-items-center">
                  <Spinner color="secondary" className="h-11" />
                </div>
              }
              items={Payables?.data || []}
              loadingState={isPending || isRefetching ? "loading" : "idle"}
              // loadingState='loading'
            >
              {(item: IPaymentEntry) => (
                <TableRow key={item.name}>
                  {(columnKey) => (
                    <TableCell
                      className={cn(columnKey == "remarks", "max-w-[250px]")}
                    >
                      {renderCell(item, columnKey)}
                    </TableCell>
                  )}
                </TableRow>
              )}
            </TableBody>
          </Table>
        </div>
      </div>

      <CustomModal
        size="3xl"
        radius="none"
        placement="right"
        isDismissable={false}
        classNames={{
          header: "p-0 text-white",
          closeButton: "text-white hover:text-black",
          body: "px-6 pt-6",
        }}
        header={
          <div className="bg-secondary p-6">
            <div>Payment Entry</div>
            <p className="text-sm font-light">
              Fill out the following requirements.
            </p>
          </div>
        }
        {...makePaymentEntryModal}
        body={
          <>
            <MakePaymentEntryModalModal
              invoice_type={
                invoiceType() == "purchase"
                  ? "Purchase Invoice"
                  : "Sales Invoice"
              }
              payment_type="Receive"
              invoice_name={name}
              onClose={(refetchData) => {
                makePaymentEntryModal.onClose();
                if (refetchData) {
                  refetch();
                }
              }}
            />
          </>
        }
      />

      <ApprovalModal
        approval_type="payment-entry"
        doctype="Payment Entry"
        {...actionModalData}
        {...approvalModalControl}
      />

      <PDFDownloadLink
        // key={String(Date.now())}
        document={
          <InvoicePdfTemplate
            invoice={capitalize(invoiceType())}
            invoiceData={{ ...data, logo_url: imageSrc }}
          />
        }
        fileName={`${name}-${Math.random().toString(36).substring(2, 15)}.pdf`}
      >
        {({ loading, blob }) => {
          return (
            <div className="col-span-full flex items-center justify-center gap-4 mt-4 ">
              <Button className="bg-primary-green hover:bg-primary-green/hover flex items-center gap-2">
                {loading ? "Loading document..." : "Download Invoice"}
                <Icon icon="hugeicons:download-04" className="text-[19px]" />
              </Button>

              <Button
                className="bg-primary-green hover:bg-primary-green/hover flex items-center gap-2"
                onClick={(e) => {
                  e.preventDefault();
                  e.stopPropagation();
                  setFile(blob);
                  emailModal.onOpen();
                }}
              >
                Email Invoice
                <Icon icon="prime:send" className="text-[19px]" />
              </Button>
            </div>
          );
        }}
      </PDFDownloadLink>
    </div>
  );
};

export function PreviewTab({
  label,
  value,
  valueComponent,
}: {
  label: string;
  value?: string;
  valueComponent?: React.ReactNode;
}) {
  return (
    <div className="font-medium">
      <p className="text-gray-400">{label}</p>
      {valueComponent ? valueComponent : <p>{isEmpty(value) ? "-" : value}</p>}
    </div>
  );
}
export default ViewInvoice;
