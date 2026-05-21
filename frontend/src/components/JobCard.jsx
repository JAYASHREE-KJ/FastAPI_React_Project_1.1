import React, { useState } from "react";

import { useDeleteJob } from "../hooks/useDeleteJob";
import { useUpdateJob } from "../hooks/useUpdateJob";

export default function JobCard({ job }) {
  const deleteMutation = useDeleteJob();

  const updateMutation = useUpdateJob();

  const [isEditing, setIsEditing] =
    useState(false);

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
    <div className="card">
      {isEditing ? (
        <>
          <input
            type="text"
            name="company"
            value={editData.company}
            onChange={handleChange}
          />

          <input
            type="text"
            name="role"
            value={editData.role}
            onChange={handleChange}
          />

          <select
            name="status"
            value={editData.status}
            onChange={handleChange}
          >
            <option>Applied for role</option>
            <option>Interview scheduled</option>
            <option>Rejected</option>
            <option>Offer</option>
          </select>

          <input
            type="date"
            name="applied_date"
            value={editData.applied_date}
            onChange={handleChange}
          />

          <button onClick={handleUpdate}>
            Save
          </button>

          <button
            onClick={() =>
              setIsEditing(false)
            }
          >
            Cancel
          </button>
        </>
      ) : (
        <>
          <h3>{job.company}</h3>

          <p>Role: {job.role}</p>

          <p>Status: {job.status}</p>

          <p>Date: {job.applied_date}</p>

          <button
            onClick={() =>
              setIsEditing(true)
            }
          >
            Edit
          </button>

          <button
            onClick={() =>
              deleteMutation.mutate(job.id)
            }
          >
            Delete
          </button>
        </>
      )}
    </div>
  );
}