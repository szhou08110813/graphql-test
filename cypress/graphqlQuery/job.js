import { DateTime } from "luxon";
const today = DateTime.now().toString();

export const create_job = `mutation createJob($createInput: NewJobs!) {
    schema {
        insertJobs(input: $createInput) 
    }
  }
  `;

export const createInput = `{ "createInput": {
    "Duration": 50,
    "Description": "autotest ${today}",
    "RegionId": "00036bc5-782c-4e85-8d48-007b3ee296f4",
    "JobStatus": "Queued"
  }
 } `;
