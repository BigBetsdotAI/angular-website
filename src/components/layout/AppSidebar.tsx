import { Mail, Upload, Send, History, FileText, LogOut, Menu } from "lucide-react";
import { NavLink, useLocation, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { signOut } from "@/lib/auth";
import { toast } from "sonner";
import { cn } from "@/lib/utils";
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarHeader,
  SidebarFooter,
  SidebarTrigger,
  useSidebar,
} from "@/components/ui/sidebar";
import { Button } from "@/components/ui/button";

const navItems = [
  { title: "Compose Message", url: "/dashboard/compose", icon: Mail },
  { title: "Upload Excel", url: "/dashboard/upload", icon: Upload },
  { title: "Send Emails", url: "/dashboard/send", icon: Send },
  { title: "History", url: "/dashboard/history", icon: History },
  { title: "Templates", url: "/dashboard/templates", icon: FileText },
];

export function AppSidebar() {
  const location = useLocation();
  const navigate = useNavigate();
  const { state } = useSidebar();
  const collapsed = state === "collapsed";

  const handleLogout = async () => {
    const { error } = await signOut();
    if (error) {
      toast.error("Failed to log out");
    } else {
      toast.success("Logged out successfully");
      navigate("/login");
    }
  };

  return (
    <Sidebar collapsible="icon" className="border-r border-border bg-sidebar">
      <SidebarHeader className="p-4">
        <div className="flex items-center gap-3">
          <div className="h-10 w-10 rounded-xl gradient-primary flex items-center justify-center shadow-glow">
            <Mail className="h-5 w-5 text-primary-foreground" />
          </div>
          {!collapsed && (
            <motion.div
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              className="flex flex-col"
            >
              <span className="font-semibold text-foreground">MailFlow</span>
              <span className="text-xs text-muted-foreground">Bulk Email Sender</span>
            </motion.div>
          )}
        </div>
      </SidebarHeader>

      <SidebarContent className="px-2">
        <SidebarGroup>
          <SidebarGroupContent>
            <SidebarMenu className="space-y-1">
              {navItems.map((item) => {
                const isActive = location.pathname === item.url;
                return (
                  <SidebarMenuItem key={item.title}>
                    <SidebarMenuButton
                      asChild
                      isActive={isActive}
                      className={cn(
                        "relative transition-all duration-200",
                        isActive && "bg-accent text-accent-foreground"
                      )}
                    >
                      <NavLink to={item.url} className="flex items-center gap-3 px-3 py-2.5 rounded-lg">
                        <item.icon className={cn("h-5 w-5", isActive && "text-primary")} />
                        {!collapsed && <span className="font-medium">{item.title}</span>}
                        {isActive && (
                          <motion.div
                            layoutId="activeTab"
                            className="absolute inset-0 bg-accent rounded-lg -z-10"
                            transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                          />
                        )}
                      </NavLink>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                );
              })}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>

      <SidebarFooter className="p-4">
        <Button
          variant="ghost"
          onClick={handleLogout}
          className={cn(
            "w-full justify-start gap-3 text-muted-foreground hover:text-destructive hover:bg-destructive/10",
            collapsed && "justify-center px-2"
          )}
        >
          <LogOut className="h-5 w-5" />
          {!collapsed && <span>Logout</span>}
        </Button>
      </SidebarFooter>
    </Sidebar>
  );
}
