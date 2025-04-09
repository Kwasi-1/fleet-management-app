import CustomContainerComponent from "./CustomContainerComponent";
import CustomTableComponent from "./CustomTableComponent";
import { Icon } from "@iconify/react";
import { Chip } from "@nextui-org/react";
import { format } from "date-fns";
import { isEmpty, isEqual, last } from "lodash";
import { useState } from "react";

const dummyActivities = [
  {
    id: "1",
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
    createdBy: "Admin",
    actionedBy: "John Doe",
    target: "item_001",
    status: "submitted",
    description: "",
    message: "Initial application submitted.",
    stageId: "stage1",
    customerId: "cust_123",
    applicationId: "app_123",
  },
  {
    id: "2",
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
    createdBy: "System",
    actionedBy: "",
    target: "item_001",
    status: "approved",
    description: "",
    message: "",
    stageId: "stage2",
    customerId: "cust_123",
    applicationId: "app_123",
  },
  {
    id: "3",
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
    createdBy: "Jane Doe",
    actionedBy: "Jane Doe",
    target: "item_001",
    status: "custom",
    description: "1. Uploaded document\n2. Added a comment",
    message: "",
    stageId: "stage3",
    customerId: "cust_123",
    applicationId: "app_123",
  },
];

const ActivitiesComponent = () => {
  const product = "item_001";

  const activities = dummyActivities.filter((item) =>
    isEqual(item.target, product)
  );

  const rows = activities.map((i) => {
    const isComment = !isEmpty(i.message);
    const firstStatus = (last(activities) as any)?.id === i.id;
    const dateCreated = new Date(i.createdAt);
    const user = i.actionedBy || i.createdBy;

    return {
      id: i.id,
      activity: (
        <div className="flex gap-x-3 text-[13px]">
          <Icon icon="ph:dot-outline-fill" className="my-1 text-[20px]" />
          <div className="flex flex-col gap-y-1">
            <div>
              <span className="font-medium">{user}</span>{" "}
              {i.status === "custom"
                ? "made an update"
                : firstStatus
                ? "submitted an application"
                : isComment
                ? "added a comment"
                : "changed the status"}{" "}
              {format(dateCreated, "MMMM do, yyyy")} at{" "}
              {format(dateCreated, "hh:mm a")}
            </div>

            {isComment || i.status === "custom" ? (
              String(i.message || i.description)
                .split(/\d+\.\s?/)
                .filter(Boolean)
                .map((m, index) => (
                  <span key={index} className="font-light flex items-center">
                    <Icon icon="ph:dot-outline-thin" className="text-2xl" /> {m}
                  </span>
                ))
            ) : (
              <div className="flex gap-x-2 items-center">
                <Chip
                  color={colors[i.status]}
                  variant="flat"
                  radius="sm"
                  size="sm"
                  className="uppercase text-xs font-medium"
                >
                  {i.status}
                </Chip>
              </div>
            )}
          </div>
        </div>
      ),
    };
  });

  const [params, setParams] = useState({
    page: 1,
    limit: 5,
    count: activities.length,
  });

  const activityTable = rows.slice(
    params.page * params.limit - params.limit,
    params.page * params.limit
  );

  return (
    <CustomContainerComponent styles="p-2">
      <CustomTableComponent
        columns={[
          {
            key: "activity",
            label: (
              <div className="flex items-center justify-between">
                <span className="text-sm">Activity</span>
              </div>
            ),
          },
        ]}
        rows={activityTable}
        classNames={{
          td: "py-3",
          tr: "hover:cursor-default",
          th: "bg-transparent",
        }}
        customColumns
        onclick={() => null}
        isPaginated
        setParams={setParams}
        params={params}
      />
    </CustomContainerComponent>
  );
};

export default ActivitiesComponent;

const colors: Record<string, "primary" | "danger" | "warning" | "success"> = {
  approved: "primary",
  rejected: "danger",
  open: "warning",
  submitted: "warning",
  booked: "success",
  disbursed: "success",
  completed: "success",
  custom: "primary",
};
