// import { Bell, Search, User } from "lucide-react";
// import { Button } from "~/components/ui/button";
// import { Input } from "~/components/ui/input";
import { SidebarTrigger } from "~/components/ui/sidebar";

const AdminHeader = () => {
  return (
    <header className="flex items-center justify-between border-b border-b-zinc-200 px-6 py-4">
      <div className="flex items-center">
        <SidebarTrigger className="mr-4" />
        {/* <h1 className="text-2xl font-bold">Admin Dashboard</h1> */}
      </div>
      <div className="flex items-center space-x-4">
        {/* <div className="relative">
          <Search className="absolute left-2 top-1/2 h-4 w-4 -tranzinc-y-1/2 transform text-gray-400" />
          <Input type="search" placeholder="Search..." className="w-64 pl-8" />
        </div>
        <Button variant="ghost" size="icon">
          <Bell className="h-5 w-5" />
        </Button>
        <Button variant="ghost" size="icon">
          <User className="h-5 w-5 text-white" />
        </Button> */}
      </div>
    </header>
  );
};

export default AdminHeader;
