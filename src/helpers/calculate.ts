import type { TravelRecord } from "../types";

export const calculateForILRRequirements = (records: TravelRecord[], visaStartDate: Date): { [rule: string]: { type: 'ILR'| 'BC', valid: boolean, remains: number } } => {
  const oneDay = 24 * 60 * 60 * 1000; // Milliseconds in a day
  const maxDaysOutside = 180;

  const fiveYears = new Date(visaStartDate);
  fiveYears.setFullYear(fiveYears.getFullYear() + 5);

  const ruleResults: { [rule: string]: { type: 'ILR'| 'BC', valid: boolean, remains: number } } = {};

  // Sort records by start date
  records.sort((a, b) => new Date(a.departure_date).getTime() - new Date(b.departure_date).getTime());

  // Check the 180-day rule
  let isValid = true;
  let daysOutside = 0;

  for (let i = 0; i < records.length; i++) {
    const record = records[i];
    const recordStart = new Date(record.departure_date);
    const recordEnd = new Date(record.return_date);

    // Skip records outside the 5-year period
    if (recordEnd < visaStartDate || recordStart > fiveYears) {
      continue;
    }

    // Adjust record dates to fit within the 5-year period
    const adjustedStart = recordStart < visaStartDate ? visaStartDate : recordStart;
    const adjustedEnd = recordEnd > fiveYears ? fiveYears : recordEnd;

    // Rolling 12-month check
    for (let j = 0; j < records.length; j++) {
      const rollingStart = new Date(adjustedStart);
      rollingStart.setFullYear(rollingStart.getFullYear() - 1);

      daysOutside = records
        .filter(r => new Date(r.departure_date) >= rollingStart && new Date(r.return_date) <= adjustedEnd)
        .reduce((sum, r) => sum + Math.ceil((new Date(r.return_date).getTime() - new Date(r.departure_date).getTime()) / oneDay), 0) - 1;

      if (daysOutside > maxDaysOutside) {
        isValid = false;
        break;
      }
    }
  }

  ruleResults['180-day-limit'] = {
    type: 'ILR',
    valid: isValid,
    remains: isValid ? maxDaysOutside - daysOutside : 0,
  };

  return ruleResults;
};

export const calculateForBCRequirements = (records: TravelRecord[], visaStartDate: Date): { [rule: string]: { type: 'ILR'| 'BC', valid: boolean, remains: number } } => {
  const oneDay = 24 * 60 * 60 * 1000; // Milliseconds in a day
  const maxDaysOutside450 = 450;
  const maxDaysOutside90 = 90;

  const fiveYears = new Date(visaStartDate);
  fiveYears.setFullYear(fiveYears.getFullYear() + 5);

  const oneYearAgo = new Date();
  oneYearAgo.setFullYear(oneYearAgo.getFullYear() - 1);

  const ruleResults: { [rule: string]: { type: 'ILR'| 'BC', valid: boolean, remains: number } } = {};

  // Sort records by start date
  records.sort((a, b) => new Date(a.departure_date).getTime() - new Date(b.departure_date).getTime());

  // Check the 450-day rule in 5 years
  const daysOutside450 = records
    .filter(record => {
      const recordStart = new Date(record.departure_date);
      const recordEnd = new Date(record.return_date);
      return recordEnd >= visaStartDate && recordStart <= fiveYears;
    })
    .reduce((sum, record) => {
      const recordStart = new Date(record.departure_date);
      const recordEnd = new Date(record.return_date);
      const adjustedStart = recordStart < visaStartDate ? visaStartDate : recordStart;
      const adjustedEnd = recordEnd > fiveYears ? fiveYears : recordEnd;
      return sum + Math.ceil((adjustedEnd.getTime() - adjustedStart.getTime()) / oneDay);
    }, 0);

  ruleResults['450-day-limit'] = {
    type: 'BC',
    valid: daysOutside450 <= maxDaysOutside450,
    remains: daysOutside450 <= maxDaysOutside450 ? maxDaysOutside450 - daysOutside450 : 0,
  };

  // Check the 90-day rule in the last year
  const daysOutside90 = records
    .filter(record => {
      const recordStart = new Date(record.departure_date);
      const recordEnd = new Date(record.return_date);
      return recordEnd >= oneYearAgo && recordStart <= new Date();
    })
    .reduce((sum, record) => {
      const recordStart = new Date(record.departure_date);
      const recordEnd = new Date(record.return_date);
      const adjustedStart = recordStart < oneYearAgo ? oneYearAgo : recordStart;
      const adjustedEnd = recordEnd > new Date() ? new Date() : recordEnd;
      return sum + Math.ceil((adjustedEnd.getTime() - adjustedStart.getTime()) / oneDay);
    }, 0);

  ruleResults['90-day-limit'] = {
    type: 'BC',
    valid: daysOutside90 <= maxDaysOutside90,
    remains: daysOutside90 <= maxDaysOutside90 ? maxDaysOutside90 - daysOutside90 : 0,
  };

  return ruleResults;
};

