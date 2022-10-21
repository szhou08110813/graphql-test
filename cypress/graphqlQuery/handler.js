const apiUrl = Cypress.env("apiUrl");
export function createJob(query, variables) {
  return cy.request({
    url: `${apiUrl}/graphql`,
    method: "POST",
    headers: {
      Authorization: Cypress.env("Authorization"),
    },
    body: { query: query, variables: variables },
  });
}

export function deleteJob(UID) {
  return cy.request({
    url: `${apiUrl}/graphql`,
    method: "POST",
    headers: {
      Authorization: Cypress.env("Authorization"),
    },
    body: {
      query: `mutation {
      schema {
          deleteJobs(UID: "${UID}")
      }
  }`,
    },
  });
}

export function queryJobbyId(id) {
  return cy.request({
    url: `${apiUrl}/graphql`,
    method: "POST",
    headers: {
      Authorization: Cypress.env("Authorization"),
    },
    body: {
      query: `{
      jobsById(UID: "${id}") {
        UID,
        Name,
        Start,
        Duration,
        JobStatus,
        JobAllocations {
          Resource {
            Name
          }
          Status
        }
      }
    }`,
    },
  });
}

export function allocatResource(jobId) {
  return cy.request({
    url: `${apiUrl}/graphql`,
    method: "POST",
    headers: {
      Authorization: Cypress.env("Authorization"),
    },
    body: {
      query: `mutation {
        schema {insertJobAllocations(input: {JobId:"${jobId}",
        ResourceId: "0005eee8-2909-4569-9afe-1897bf03cafd", Status: "Pending Dispatch"}, idAlias: "Job_Allocation_1") }}`,
    },
  });
}
