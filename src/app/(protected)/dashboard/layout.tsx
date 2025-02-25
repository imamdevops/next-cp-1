import LayoutDashboard from "@/components/layouts/layout-dashboard";
import { AppSidebar } from "@/components/ui-dashboard/app-sidebar";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { Separator } from "@/components/ui/separator";
import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar";

export default function Page({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <LayoutDashboard>
      <main>{children}</main>
    </LayoutDashboard>
  );
}
