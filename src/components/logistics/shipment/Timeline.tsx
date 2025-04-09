import React from "react";
import { ClockIcon } from "@heroicons/react/24/outline";
import { Icon } from "@iconify/react";

interface TimelineEvent {
  title: string;
  location?: string;
  address?: string;
  time: string;
  status?: {
    label?: string;
    color?: string;
    bgColor?: string;
  } | null;
}

interface TimelineProps {
  events: TimelineEvent[];
}

const Timeline: React.FC<TimelineProps> = ({ events }) => {
  return (
    <div className="relative">
      <div className="absolute left-[10px] top-1 bottom-0 w-1 bg-[#619B7D]"></div>
      <div className="relative pl-6 space-y-8">
        {events.map((event, index) => {
          const isFirst = index === 0;
          const isLast = index === events.length - 1;

          return (
            <div
              key={index}
              className={`relative flex gap-5 ${
                isLast ? "items-end" : "items-start"
              } ${!isFirst && !isLast && "items-center"}`}
            >
              <div
                className={`bg-[#619B7D] ${
                  isFirst || isLast
                    ? "w-10 h-10 -ml-[31px]"
                    : "w-4 h-4 -ml-5 mr-[10px]"
                } rounded-full flex items-center justify-center`}
              >
                {isFirst && (
                  <Icon
                    icon="icon-park-outline:arrow-up"
                    className="h-4 w-4 text-white"
                  />
                )}
                {isLast && (
                  <Icon
                    icon="icon-park-outline:arrow-down"
                    className="h-4 w-4 text-white"
                  />
                )}
              </div>

              <div>
                <p className="font-semibold">{event.title}</p>
                {event.location && (
                  <p className="text-gray-500 text-sm">{event.location}</p>
                )}
                {event.address && (
                  <p className="text-gray-400 text-xs">{event.address}</p>
                )}
                <div className="flex items-center text-sm mt-1">
                  <ClockIcon className="h-4 w-4 text-gray-400 mr-1" />
                  {event.time}
                </div>
                {event.status && (
                  <span
                    className={`${event.status.color} text-xs ${event.status.bgColor} px-2 py-1 rounded`}
                  >
                    {event.status.label}
                  </span>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Timeline;
