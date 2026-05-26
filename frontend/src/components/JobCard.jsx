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

<Card className="w-full max-w-2xl mx-auto mt-4 rounded-2xl shadow-lg
!bg-gradient-to-r from-[#764ba2] via-[#6a4fb3] to-[#5d4aa8] text-white">

<CardHeader>
        <CardTitle className="text-lg font-semibold">
          {isEditing ? "Edit Job" : job.company}
        </CardTitle>
      </CardHeader>

      <CardContent className="space-y-4">
        {isEditing ? (
          <div className="space-y-3">
            {/* Company */}
            <div className="flex flex-col gap-1">
              <label className="text-sm font-medium">Company</label>
              <Input
                name="company"
                value={editData.company}
                onChange={handleChange}
              />
            </div>

            {/* Role */}
            <div className="flex flex-col gap-1">
              <label className="text-sm font-medium">Role</label>
              <Input
                name="role"
                value={editData.role}
                onChange={handleChange}
              />
            </div>

            {/* Status */}
            <div className="flex flex-col gap-1">
              <label className="text-sm font-medium">Status</label>
              <Select
                value={editData.status}
                onValueChange={(value) =>
                  setEditData({ ...editData, status: value })
                }
              >
                <SelectTrigger>
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

            {/* Date */}
            <div className="flex flex-col gap-1">
              <label className="text-sm font-medium">Applied Date</label>
              <Input
                type="date"
                name="applied_date"
                value={editData.applied_date}
                onChange={handleChange}
              />
            </div>

            {/* Buttons */}
            <div className="flex justify-end gap-2 pt-2">
              <Button onClick={handleUpdate}>
                Save
              </Button>

              <Button
                variant="outline"
                onClick={() => setIsEditing(false)}
              >
                Cancel
              </Button>
            </div>
          </div>
        ) : (
          <div className="space-y-2">
            <p>
              <span className="font-medium">Role:</span>{" "}
              {job.role}
            </p>

            <p>
              <span className="font-medium">Status:</span>{" "}
              {job.status}
            </p>

            <p>
              <span className="font-medium">Date:</span>{" "}
              {job.applied_date}
            </p>

            {/* Buttons */}
            <div className="flex justify-end gap-2 pt-3">
              <Button onClick={() => setIsEditing(true)}>
                Edit
              </Button>

              <Button
                variant="bg-white/20 text-white border border-white/30 hover:bg-white/30"
                onClick={() =>
                  deleteMutation.mutate(job.id)
                }
              >
                Delete
              </Button>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
}