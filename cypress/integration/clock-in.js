describe("clock-in", () => {
  beforeEach(() => {
    // Preserve every cookie in every test
    Cypress.Cookies.defaults({
      preserve: () => true,
    });
  });

  it("should login", () => {
    cy.visit(
      "https://api.factorialhr.com/es/users/sign_in?return_host=factorialhr.es"
    );
    cy.location("pathname").then((pathname) => {
      if (pathname.includes("sign_in")) {
        cy.findByLabelText(/Correo electrónico/i).type(Cypress.env("user"));
        cy.findByLabelText(/Contraseña/i).type(Cypress.env("pass"));
        cy.findByRole("button", { name: /iniciar sesión/i }).click();
      }
    });
  });
  const days = [...Array(new Date().getDate()).keys()].map((day) => day + 1);
  const months = [
    "ene",
    "feb",
    "mar",
    "abr",
    "may",
    "jun",
    "jul",
    "ago",
    "sep",
    "oct",
    "nov",
    "dic",
  ];
  const currentMonth = months[new Date().getMonth()];
  for (const day in days) {
    it(`should clock in ${days[day]} ${currentMonth}`, () => {
      cy.visit("https://app.factorialhr.com/attendance/clock-in");
      cy.findByText(`${days[day]} ${currentMonth}.`)
          .parents("tr")
          .should(
              "have.css",
              "background",
              "rgba(0, 0, 0, 0) none no-repeat scroll 0% 0% / auto padding-box border-box",
              { message: "Is weekend" }
          )
          .within((container) => {
            cy.findAllByPlaceholderText(/--:--/i)
                .first()
                .should("not.have.value", "07:00")
                .type("0700", { force: true });
            cy.findAllByPlaceholderText(/--:--/i)
                .last()
                .type("1400", { force: true });
            cy.findAllByRole("button").first().click({ force: true });
            cy.findAllByRole("button").last().click({ force: true });
            cy.findAllByPlaceholderText(/--:--/i)
                .eq(2)
                .type("1500", { force: true });
            cy.findAllByPlaceholderText(/--:--/i)
                .eq(3)
                .type("1600", { force: true });
            cy.findAllByRole("button").eq(1).click({ force: true });
          });
    });
  }
});
