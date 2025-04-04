import React, { useState } from "react";
import { Card, CardContent } from "./components/ui/card";
import { Button } from "./components/ui/button";
import { Input } from "./components/ui/input";
import { Textarea } from "./components/ui/textarea";

export default function JobTracker() {
  const [jobs, setJobs] = useState([]);
  const [form, setForm] = useState({
    company: "",
    role: "",
    status: "",
    notes: "",
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const addJob = () => {
    if (form.company && form.role) {
      setJobs([...jobs, { ...form, id: Date.now() }]);
      setForm({ company: "", role: "", status: "", notes: "" });
    }
  };

  const deleteJob = (id) => {
    setJobs(jobs.filter((job) => job.id !== id));
  };

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">Job Application Tracker</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
        <Input name="company" placeholder="Company Name" value={form.company} onChange={handleChange} />
        <Input name="role" placeholder="Job Role" value={form.role} onChange={handleChange} />
        <Input name="status" placeholder="Application Status" value={form.status} onChange={handleChange} />
        <Textarea name="notes" placeholder="Notes (interview date, contact, etc.)" value={form.notes} onChange={handleChange} />
      </div>
      <Button onClick={addJob} className="mb-6">Add Job</Button>
      <div className="grid gap-4">
        {jobs.map((job) => (
          <Card key={job.id} className="border shadow-sm">
            <CardContent className="p-4">
              <div className="flex justify-between items-center">
                <div>
                  <h2 className="text-lg font-semibold">{job.role} @ {job.company}</h2>
                  <p className="text-sm text-gray-600">Status: {job.status}</p>
                  <p className="text-sm mt-2">{job.notes}</p>
                </div>
                <Button variant="destructive" onClick={() => deleteJob(job.id)}>Delete</Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}