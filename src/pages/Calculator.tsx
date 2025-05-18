import { useRecordContext } from "../contexts/record";
import { calculateForBCRequirements, calculateForILRRequirements } from "../helpers/calculate";
import TabLayout from "../layouts/TabLayout";

export default function Calculator() {
  const { visaStartDate, updateVisaStartDate, records } = useRecordContext();

  const calculationResults = {
    ...calculateForILRRequirements(records, visaStartDate),
    ...calculateForBCRequirements(records, visaStartDate),
  }

  return (
    <TabLayout>
      <div className="p-4">
        <h1>Calculation</h1>
        {/* Input for Visa Start Date */}
        <div className="mb-4">
          <label className="block text-sm font-medium">Visa Start Date</label>
          <input
            type="date"
            className="w-full p-2 border rounded"
            value={visaStartDate.toISOString().split("T")[0]}
            onChange={(e) => updateVisaStartDate(new Date(e.target.value))}
          />
        </div>
        {/* Records Stats (day per year, Total) */}
        <div className="mb-4">
          <h2 className="text-xl font-semibold">Records Statistics</h2>
          <p>Total Records: {records.length}</p>
          <p>Records in the last year: {records.filter(record => new Date(record.return_date) >= new Date(new Date().setFullYear(new Date().getFullYear() - 1))).length}</p>

          <p>Total Days Outside: {records.reduce((total, record) => {
            const start = new Date(record.departure_date);
            const end = new Date(record.return_date);
            return total + Math.ceil((end.getTime() - start.getTime()) / (1000 * 60 * 60 * 24));
          }, 0)} days</p>
        </div>
        {/* Calculation Results */}
        <div className="mt-4">
          <h2 className="text-xl font-semibold">Calculation Results</h2>
          <ul className="mt-2">
            {Object.entries(calculationResults).map(([rule, result]) => (
              <li key={rule} className="mb-2 rounded-md p-4 border">
                <div className="font-medium">{result.type} - {rule}</div>
                <div>
                  Valid: {result.valid ? "Yes" : "No"}
                </div>
                <div>
                  Remaining Days: {result.remains}
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </TabLayout>
  );
}
