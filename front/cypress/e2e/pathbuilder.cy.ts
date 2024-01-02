describe("The FindMyPath new path form", () => {
  beforeEach(function () {
    cy.visit("http://localhost:3000");
  });
  it("is rendered", () => {
    cy.contains("FindMyPath");
    cy.get("#pathNameInput");
    cy.get("#submit").should("be.disabled");
  });
  it("cannot be submitted without a starting location", () => {
    cy.once("fail", (e) => {
      expect(e.message).to.include("Timed out retrying");
      expect(e.message).to.include("disabled");
      return false;
    });
    cy.get("#pathNameInput").type("testrun");
    cy.get("#submit").click();
  });
});

describe("After a path posting, the path listing", () => {
  beforeEach(function () {
    cy.visit("http://localhost:3000");
    cy.request({
      url: "http://localhost:3001/api/paths",
      method: "POST",
      body: {
        name: "testpath",
        distance: 2000,
        duration: 60,
        exhausting: 0,
        nature: 0,
        fun: 0,
      },
    });
  });
  it("is updated", () => {
    cy.contains("All paths");
    cy.get("table").contains("td", "testpath");
    cy.get("table").contains("td", "testpath").contains("2 km");
    cy.get("table").contains("td", "testpath").contains("1 mins");
  });
});
