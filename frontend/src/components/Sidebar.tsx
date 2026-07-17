import type { IconType } from "react-icons";
import {
  MdDashboard,
  MdReceiptLong,
  MdSavings,
  MdAttachMoney,
  MdSettings,
} from "react-icons/md";

interface NavEntry {
  label: string;
  icon: IconType;
  active?: boolean;
  disabled?: boolean;
}

const navEntries: NavEntry[] = [
  { label: "Overview", icon: MdDashboard, active: true },
  { label: "Expenses", icon: MdReceiptLong, disabled: true },
  { label: "Budgets", icon: MdSavings, disabled: true },
  { label: "Income", icon: MdAttachMoney, disabled: true },
  { label: "Settings", icon: MdSettings, disabled: true },
];

export const Sidebar = () => {
  return (
    <div className="col-span-1 bg-teal-900 p-3 rounded-r-xl flex flex-col gap-4">
      <h1 className="font-black text-xl text-white">
        FinFree <span className="font-normal text-sm">Smart Budget Tracking</span>
      </h1>
      <nav aria-label="Primary">
        <ul className="flex flex-col gap-1">
          {navEntries.map(({ label, icon: Icon, active, disabled }) => (
            <li key={label}>
              <button
                type="button"
                disabled={disabled}
                aria-disabled={disabled ? true : undefined}
                aria-current={active ? "page" : undefined}
                className={`w-full flex items-center gap-2 p-2 rounded-lg text-left focus:ring-2 focus:ring-white ${
                  active ? "bg-white/10 text-white font-bold" : "text-white/60"
                } ${
                  disabled ? "cursor-not-allowed" : "cursor-pointer hover:bg-white/10"
                }`}
              >
                <Icon aria-hidden="true" />
                <span>{label}</span>
                {disabled && (
                  <span className="ml-auto text-xs text-white/40">Soon</span>
                )}
              </button>
            </li>
          ))}
        </ul>
      </nav>
    </div>
  );
};
