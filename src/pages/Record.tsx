import { useRecordContext } from "../contexts/record";
import { useNavigate } from "react-router-dom";
import type { TravelRecord } from "../types";
import TabLayout from "../layouts/TabLayout";

const Record = () => {
  const { records, deleteRecord } = useRecordContext();
  const navigate = useNavigate();

  const handleEdit = (index: number) => {
    navigate("/edit", { state: { record: records[index], index } });
  };

  return (
    <TabLayout>
    <div className="p-4">
      <h1 className="text-2xl font-bold">Travel Records</h1>
      <div className="mb-4">
        <button
          onClick={() => navigate('/edit?new=true')}
          className="px-4 py-2 bg-green-500 text-white rounded"
        >
          New Record
        </button>
      </div>
      {records.length === 0 ? (
        <p>No records available. Add a new record!</p>
      ) : (
        <ul className="mt-4">
          {records.map((record: TravelRecord, index: number) => (
            <li key={index} className="mb-4 p-4 border rounded">
              <h2 className="text-lg font-semibold">{record.trip_title}</h2>
              <p><strong>Country:</strong> {record.country}</p>
              <p><strong>Departure:</strong> {record.departure_date}</p>
              <p><strong>Return:</strong> {record.return_date}</p>
              {record.data.reference_number && (
                <p><strong>Reference Number:</strong> {record.data.reference_number}</p>
              )}
              {record.data.travel_purpose && (
                <p><strong>Purpose:</strong> {record.data.travel_purpose}</p>
              )}
              <div className="mt-2 flex gap-2">
                <button
                  onClick={() => handleEdit(index)}
                  className="px-4 py-2 bg-yellow-500 text-white rounded"
                >
                  Edit
                </button>
                <button
                  onClick={() => deleteRecord(index)}
                  className="px-4 py-2 bg-red-500 text-white rounded"
                >
                  Delete
                </button>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
    </TabLayout>
  );
};

export default Record;
