import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { tabs } from "../tabs";
import type { IconProp } from "@fortawesome/fontawesome-svg-core";

const TabNavigation = () => {
  return (
    <nav className="tab-navigation">
      {tabs.map((tab) => (
        <Link key={tab.name} to={tab.href} className="tab-link">
          <FontAwesomeIcon icon={tab.icon as IconProp} />
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
