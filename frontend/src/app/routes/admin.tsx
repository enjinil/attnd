import { useState } from "react";
import DashboardLayout from "../../components/ui/dashboard-layout";
import { SessionsFilterForm } from "../../features/sessions/components/sessions-filter-form";
import { formatDate } from "../../utils/date";
// import { Pagination } from "../../components/ui/pagination";
import { AdminUserSessionsTable } from "../../features/sessions/components/admin-user-sessions-table";

const todayDate = formatDate(new Date());

const AdminPage = () => {
  const [params, setParams] = useState<{ startDate: string }>({
    startDate: todayDate,
  });

  return (
    <DashboardLayout>
      <div className="flex flex-wrap -mx-4">
        <div className="w-full lg:w-1/2 px-4 mb-4">
          <div className="flex justify-between mb-4">
            <h3 className="font-bold py-1">Sessions</h3>
            <SessionsFilterForm
              params={params}
              onChange={({ startDate }) => setParams({ startDate: startDate })}
              customText={(query, defaultText) =>
                query.startDate == todayDate ? "Today" : defaultText
              }
            />
          </div>
          <AdminUserSessionsTable params={params} />
        </div>
        {/* <div className="w-full lg:w-1/2 px-4 mb-4">
          <h3 className="font-bold py-1 mb-4">Activities</h3>
          <div className="flex flex-col mb-2">
            <p className="py-1 px-3 rounded bg-slate-50 text-sm text-slate-600 border border-slate-300 mb-1">
              <span className="text-black">Test user 2</span> ended a session at
              17:00.
            </p>
            <p className="py-1 px-3 rounded bg-slate-50 text-sm text-slate-600 border border-slate-300 mb-1">
              <span className="text-black">Test user 3</span> started a session
              at 08:04.
            </p>
            <p className="py-1 px-3 rounded bg-slate-50 text-sm text-slate-600 border border-slate-300 mb-1">
              <span className="text-black">Test user 2</span> started a session
              at 08:04.
            </p>
            <p className="py-1 px-3 rounded bg-slate-50 text-sm text-slate-600 border border-slate-300 mb-1">
              <span className="text-black">Test user 1</span> started a session
              at 08:04.
            </p>
          </div>
          <Pagination
            total={100}
            current={1}
            onPrev={() => null}
            onNext={() => null}
          />
        </div> */}
      </div>
    </DashboardLayout>
  );
};

export default AdminPage;
