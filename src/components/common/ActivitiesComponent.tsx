import CustomContainerComponent from "./CustomContainerComponent";
import CustomTableComponent from "./CustomTableComponent";
import { Icon } from "@iconify/react";
import { useState } from "react";

// const dummyActivities = [
//   {
//     id: "1",
//     createdAt: new Date().toISOString(),
//     updatedAt: new Date().toISOString(),
//     createdBy: "Admin",
//     actionedBy: "John Doe",
//     target: "item_001",
//     status: "submitted",
//     description: "",
//     message: "Initial application submitted.",
//     stageId: "stage1",
//     customerId: "cust_123",
//     applicationId: "app_123",
//   },
//   {
//     id: "2",
//     createdAt: new Date().toISOString(),
//     updatedAt: new Date().toISOString(),
//     createdBy: "System",
//     actionedBy: "",
//     target: "item_001",
//     status: "approved",
//     description: "",
//     message: "",
//     stageId: "stage2",
//     customerId: "cust_123",
//     applicationId: "app_123",
//   },
//   {
//     id: "3",
//     createdAt: new Date().toISOString(),
//     updatedAt: new Date().toISOString(),
//     createdBy: "Jane Doe",
//     actionedBy: "Jane Doe",
//     target: "item_001",
//     status: "custom",
//     description: "1. Uploaded document\n2. Added a comment",
//     message: "",
//     stageId: "stage3",
//     customerId: "cust_123",
//     applicationId: "app_123",
//   },
// ];

interface ActivitiesComponentProps {
  activities: Array<{
    type: string;
    content: string;
    timestamp: string;
  }>;
}

const ActivitiesComponent = ({ activities }: ActivitiesComponentProps) => {
  const rows = activities.map((activity, index) => {
    return {
      id: index.toString(),
      activity: (
        <div className="flex gap-x-3 text-[13px]">
          <div className="w-10 h-10 rounded-full bg-purple-400 text-white flex items-center justify-center font-bold text-sm">
            S
          </div>
          <div className="flex flex-col gap-y-1">
            <div>
              <span className="font-medium">System</span> {activity.content} on{" "}
              {activity.timestamp}
            </div>
            {activity.type === "note" && (
              <span className="font-light flex items-center">
                <Icon icon="ph:dot-outline-thin" className="text-2xl" />
                {activity.content}
              </span>
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

