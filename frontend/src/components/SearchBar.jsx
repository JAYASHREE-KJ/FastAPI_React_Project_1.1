import React from "react";
import { Input } from "../components/ui/input";

export default function SearchBar({ search, setSearch }) {
  return (
    <div className="relative max-w-md mx-auto mt-4">
     <Input
  type="text"
  placeholder="Search company..."
  value={search}
  onChange={(e) => setSearch(e.target.value)}
  className="bg-white/80 text-black placeholder:text-gray-600 border border-white/50 focus:ring-2 focus:ring-purple-400"
/>
    </div>
  );
}