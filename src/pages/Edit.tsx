import React, { useState, useEffect } from "react";
import { useRecordContext } from "../contexts/record";
import type { TravelRecord } from "../types";
import { useNavigate, useLocation } from "react-router-dom";

const Edit = () => {
  const { addRecord, updateRecord } = useRecordContext();
  const navigate = useNavigate();
  const location = useLocation();
  const [record, setRecord] = useState<TravelRecord>({
    user_id: "",
    trip_title: "",
    country: "",
    departure_date: "",
    return_date: "",
    data: {},
  });
  const [isEdit, setIsEdit] = useState(false);

  useEffect(() => {
    if (location.state?.record) {
      setRecord(location.state.record);
      setIsEdit(true);
    }
  }, [location.state]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (isEdit && location.state?.index !== undefined) {
      updateRecord(location.state.index, record);
    } else {
      addRecord(record);
    }
    navigate("/record");
  };

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold">{isEdit ? "Edit Record" : "New Record"}</h1>
      <form onSubmit={handleSubmit} className="mt-4">
        <div className="mb-4">
          <label className="block text-sm font-medium">Trip Title</label>
          <input
            type="text"
            value={record.trip_title}
            onChange={(e) => setRecord({ ...record, trip_title: e.target.value })}
            className="w-full p-2 border rounded"
            required
          />
        </div>
        <div className="mb-4">
          <label className="block text-sm font-medium">Country</label>
          <input
            type="text"
            value={record.country}
            onChange={(e) => setRecord({ ...record, country: e.target.value })}
            className="w-full p-2 border rounded"
            required
          />
        </div>
        <div className="mb-4">
          <label className="block text-sm font-medium">Departure Date</label>
          <input
            type="date"
            value={record.departure_date}
            onChange={(e) => setRecord({ ...record, departure_date: e.target.value })}
            className="w-full p-2 border rounded"
            required
          />
        </div>
        <div className="mb-4">
          <label className="block text-sm font-medium">Return Date</label>
          <input
            type="date"
            value={record.return_date}
            onChange={(e) => setRecord({ ...record, return_date: e.target.value })}
            className="w-full p-2 border rounded"
            required
          />
        </div>
        <div className="mb-4">
          <label className="block text-sm font-medium">Reference Number</label>
          <input
            type="text"
            value={record.data.reference_number || ""}
            onChange={(e) => setRecord({ ...record, data: { ...record.data, reference_number: e.target.value } })}
            className="w-full p-2 border rounded"
          />
        </div>
        <div className="mb-4">
          <label className="block text-sm font-medium">Travel Purpose</label>
          <select
            value={record.data.travel_purpose || ""}
            onChange={(e) => setRecord({ ...record, data: { ...record.data, travel_purpose: e.target.value } })}
            className="w-full p-2 border rounded"
          >
            <option value="">Select Purpose</option>
            <option value="Business">Business</option>
            <option value="Holiday">Holiday</option>
            <option value="Other">Other</option>
          </select>
        </div>
        <button type="submit" className="px-4 py-2 bg-blue-500 text-white rounded">
          {isEdit ? "Update" : "Add"}
        </button>
      </form>
    </div>
  );
};

export default Edit;
