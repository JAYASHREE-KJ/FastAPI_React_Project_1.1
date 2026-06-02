import React, { useState } from "react";
import { useDeleteJob } from "../hooks/useDeleteJob";
import { useUpdateJob } from "../hooks/useUpdateJob";

import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
} from "../components/ui/card";

import { Input } from "../components/ui/input";
import { Button } from "../components/ui/button";

import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "../components/ui/select";

export default function JobCard({ job }) {
  const deleteMutation = useDeleteJob();
  const updateMutation = useUpdateJob();

  const [isEditing, setIsEditing] = useState(false);

  const [editData, setEditData] = useState({
    company: job.company,
    role: job.role,
    status: job.status,
    applied_date: job.applied_date,
  });

  const handleChange = (e) => {
    setEditData({
      ...editData,
      [e.target.name]: e.target.value,
    });
  };

  const handleUpdate = () => {
    updateMutation.mutate({
      id: job.id,
      data: editData,
    });
    setIsEditing(false);
  };

  return (
    <Card className="w-full max-w-2xl mx-auto mt-4 border border-slate-200 bg-white shadow-sm">
      <CardHeader className="px-6 pt-6">
        <CardTitle className="text-lg font-semibold text-slate-900">
          {isEditing ? "Edit Job" : job.company}
        </CardTitle>
      </CardHeader>

      <CardContent className="space-y-4 px-6 pb-6">
        {isEditing ? (
          <div className="space-y-4">
            <div className="space-y-2">
              <label className="text-sm font-medium text-slate-700">Company</label>
              <Input
                name="company"
                value={editData.company}
                onChange={handleChange}
                className="h-11 rounded-lg border border-slate-200 bg-slate-50 text-slate-900 placeholder:text-slate-500 focus:border-violet-500 focus:ring-violet-100"
              />
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium text-slate-700">Role</label>
              <Input
                name="role"
                value={editData.role}
                onChange={handleChange}
                className="h-11 rounded-lg border border-slate-200 bg-slate-50 text-slate-900 placeholder:text-slate-500 focus:border-violet-500 focus:ring-violet-100"
              />
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium text-slate-700">Status</label>
              <Select
                value={editData.status}
                onValueChange={(value) => setEditData({ ...editData, status: value })}
              >
                <SelectTrigger className="h-11 rounded-lg border border-slate-200 bg-slate-50 text-slate-900 focus:border-violet-500 focus:ring-violet-100">
                  <SelectValue placeholder="Select status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Applied">Applied</SelectItem>
                  <SelectItem value="Interview">Interview</SelectItem>
                  <SelectItem value="Rejected">Rejected</SelectItem>
                  <SelectItem value="Offer">Offer</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium text-slate-700">Applied Date</label>
              <Input
                type="date"
                name="applied_date"
                value={editData.applied_date}
                onChange={handleChange}
                className="h-11 rounded-lg border border-slate-200 bg-slate-50 text-slate-900 placeholder:text-slate-500 focus:border-violet-500 focus:ring-violet-100"
              />
            </div>

            <div className="flex flex-wrap justify-end gap-2 pt-2">
              <Button onClick={handleUpdate} className="h-10 bg-violet-600 text-white hover:bg-violet-700">
                Save
              </Button>
              <Button variant="outline" onClick={() => setIsEditing(false)} className="h-10 text-slate-700 border-slate-200">
                Cancel
              </Button>
            </div>
          </div>
        ) : (
          <div className="space-y-4 text-slate-700">
            <p>
              <span className="font-medium text-slate-900">Role:</span> {job.role}
            </p>

            <p>
              <span className="font-medium text-slate-900">Status:</span> {job.status}
            </p>

            <p>
              <span className="font-medium text-slate-900">Date:</span> {job.applied_date}
            </p>

            <div className="flex flex-wrap justify-end gap-2 pt-3">
              <Button className="h-10 bg-violet-600 text-white hover:bg-violet-700" onClick={() => setIsEditing(true)}>
                Edit
              </Button>
              <Button className="h-10 bg-rose-500 text-white hover:bg-rose-600" onClick={() => deleteMutation.mutate(job.id)}>
                Delete
              </Button>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
}