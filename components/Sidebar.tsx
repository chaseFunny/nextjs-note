// src/components/LiftedComponent.tsx

import { Button } from "@/components/ui/button";

interface SidebarProps {}
const Sidebar: React.FC<SidebarProps> = () => {
  return <Button>提交</Button>;
};

export default Sidebar;
