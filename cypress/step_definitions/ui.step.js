import { createInput, create_job } from "../graphqlQuery/job";
import {
  createJob,
  deleteJob,
  queryJobbyId,
  allocatResource,
} from "../graphqlQuery/handler";
/* global Given, When, Then, cy, Before */
const apiUrl = Cypress.env("apiUrl");
const webUrl = Cypress.config("baseUrl");
var jobId;
beforeEach({}, () => {
  cy.intercept("/*", (req) => {
    req.headers["Authorization"] = Cypress.env("Authorization");
  });
});

Given(`I create a job using api`, () => {
  createJob(create_job, JSON.parse(createInput)).then((res) => {
    expect(res.status).equal(200);
    jobId = res.body.data.schema.insertJobs;
  });
});

Then(`I delete this job using api`, () => {
  deleteJob(jobId).then((res) => {
    expect(res.status).equal(200);
  });
});

Then(`I allocate resource to job using api`, () => {
  allocatResource(jobId).then((res) => {
    expect(res.status).equal(200);
  });
});

Then(`I visit job detail page`, () => {
  cy.visit(`/job/${jobId}/details`);
  cy.wait(2000);
});

Then("I should see {string} in the {string} field", (value, field) => {
  cy.get("html").find(`[data-sk-name="${field}"]`).contains(value);
});

Then("I click {string} field", (field) => {
  cy.get("html").find(`[data-sk-name="${field}"]`).click();
});
