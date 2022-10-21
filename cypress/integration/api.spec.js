import { createInput, create_job } from "../graphqlQuery/job";
import {
  createJob,
  deleteJob,
  queryJobbyId,
  allocatResource,
} from "../graphqlQuery/handler";

describe("Skedulo API Test", () => {
  it("Create Job and delete it before allocate resource", () => {
    var jobId;
    createJob(create_job, JSON.parse(createInput)).then((res) => {
      expect(res.status).equal(200);
      jobId = res.body.data.schema.insertJobs;
      queryJobbyId(jobId).then((res) => {
        expect(res.status).equal(200);
        console.log(res);
        expect(res.body.data.jobsById.JobStatus).equal("Queued");
      });
      deleteJob(jobId).then((res) => {
        expect(res.status).equal(200);
      });
    });
  });

  it("Create Job and delete it after allocate resource", () => {
    var jobId;
    createJob(create_job, JSON.parse(createInput)).then((res) => {
      expect(res.status).equal(200);
      jobId = res.body.data.schema.insertJobs;
      queryJobbyId(jobId).then((res) => {
        expect(res.status).equal(200);
        expect(res.body.data.jobsById.JobStatus).equal("Queued");
      });
      allocatResource(jobId).then((res) => {
        expect(res.status).equal(200);
      });
      queryJobbyId(jobId).then((res) => {
        expect(res.status).equal(200);
        console.log(res.body);
        expect(res.body.data.jobsById.JobAllocations[0].Status).equal(
          "Pending Dispatch"
        );
      });
      deleteJob(jobId).then((res) => {
        expect(res.status).equal(200);
      });
    });
  });

  //There should be more tests about resources and jobs status changing and life cycle
});
