import { Outlet } from "react-router-dom";
import { SidebarProvider, SidebarTrigger, SidebarInset } from "@/components/ui/sidebar";
import { AppSidebar } from "./AppSidebar";
import { EmailProvider } from "@/contexts/EmailContext";
import { useAuth } from "@/contexts/AuthContext";
import { motion } from "framer-motion";

export function DashboardLayout() {
  const { user } = useAuth();

  return (
    <EmailProvider>
      <SidebarProvider>
        <div className="min-h-screen flex w-full bg-background">
          <AppSidebar />
          <SidebarInset className="flex-1">
            <header className="h-16 border-b border-border bg-card/50 backdrop-blur-sm flex items-center justify-between px-6 sticky top-0 z-10">
              <div className="flex items-center gap-4">
                <SidebarTrigger className="text-muted-foreground hover:text-foreground" />
                <div className="h-6 w-px bg-border" />
                <span className="text-sm text-muted-foreground">
                  Welcome back, <span className="font-medium text-foreground">{user?.email?.split("@")[0]}</span>
                </span>
              </div>
            </header>
            <motion.main 
              className="p-6"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
            >
              <Outlet />
            </motion.main>
          </SidebarInset>
        </div>
      </SidebarProvider>
    </EmailProvider>
  );
}
