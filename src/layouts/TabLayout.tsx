

import { Link } from "react-router-dom";
import { tabs } from "../tabs";

const TabNavigation = () => {
  return (
    <nav className="tab-navigation">
      {tabs.map((tab) => (
        <Link key={tab.name} to={tab.href} className="tab-link">
          {tab.icon}
        </Link>
      ))}
    </nav>
  );
};

export default function TabLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="">
      {children}
      <TabNavigation />
    </div>
  );
}
