import { Outlet } from "react-router-dom";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/app-sidebar";

const AppLayout = () => {
  return (
    <SidebarProvider>
      <div className="flex  w-screen overflow-hidden">
        <AppSidebar className="fixed" />
        <main className="flex-1 p-4 overflow-x-hidden flex flex-col">
          <SidebarTrigger />
          <Outlet />
        </main>
      </div>
    </SidebarProvider>
  );
};

export default AppLayout;
