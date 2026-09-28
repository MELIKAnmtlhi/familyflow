import { ReactNode } from "react";

interface WeekLayoutProps {
  renderDay: (day: string) => ReactNode;
}

export default function WeekLayout({ renderDay }: WeekLayoutProps) {
  return (
    <div className="max-w-6xl mx-auto p-6">
     
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
        {renderDay("Saturday")}
        {renderDay("Sunday")}
        {renderDay("Monday")}
      </div>

      <div className="flex justify-center mb-4">
        <div className="w-full md:w-1/3">
          {renderDay("Tuesday")}
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {renderDay("Wednesday")}
        {renderDay("Thursday")}
        {renderDay("Friday")}
      </div>
    </div>
  );
}