Feature: test ui

    Scenario: create job and check status
        Given I create a job using api
        And I visit job detail page
        And I should see "Queue" in the "job-status" field
        And I should see "0" in the "total-allocations" field
        When I allocate resource to job using api
        And I visit job detail page
        Then I should see "1" in the "total-allocations" field
        And I should see "Pending Dispatch" in the "resource-status" field
        And I click "resource-remove" field
        And I should see "0" in the "total-allocations" field
        And I delete this job using api
