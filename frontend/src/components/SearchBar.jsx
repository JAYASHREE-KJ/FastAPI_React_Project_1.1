import React from "react";
import { Input } from "../components/ui/input";

export default function SearchBar({ search, setSearch }) {
  return (
    <div className="flex flex-col gap-2 max-w-xl mx-auto">
      <label className="text-sm font-semibold text-slate-700">Search jobs</label>
      <Input
        type="text"
        placeholder="Search by company name..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className="h-11 rounded-lg border border-slate-200 bg-white text-slate-900 placeholder:text-slate-400 shadow-sm focus:border-violet-500 focus:ring-violet-100"
      />
    </div>
  );
}