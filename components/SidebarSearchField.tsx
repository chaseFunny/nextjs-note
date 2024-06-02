"use client";
import { Input } from "@/components/ui/input";
import { useDebounce } from "ahooks";
import { usePathname, useRouter } from "next/navigation";
import { type FC, memo, useEffect, useState, useTransition } from "react";

function Spinner({ active = true }) {
  return (
    <div
      className={["spinner", "hhhhhhh", active && "spinner--active"].join(" ")}
      role="progressbar"
      aria-busy={active ? "true" : "false"}
    />
  );
}

const SidebarSearchField: FC = () => {
  const [value, setValue] = useState<string>();
  const debouncedValue = useDebounce(value, { wait: 500 });
  const { replace } = useRouter();
  const pathname = usePathname();
  const [isPending, startTransition] = useTransition();

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setValue(e.target.value);
  };
  const doSearch = () => {
    const params = new URLSearchParams(window.location.search);
    if (debouncedValue) {
      params.set("q", debouncedValue);
    } else {
      params.delete("q");
    }

    startTransition(() => {
      replace(`${pathname}?${params.toString()}`);
    });
  };
  useEffect(() => {
    doSearch();
  }, [debouncedValue]);

  return (
    <div className="SidebarSearchField">
      <Input onChange={onChange} placeholder="标题搜索" />
      <Spinner active={isPending} />
    </div>
  );
};

export default memo(SidebarSearchField);
