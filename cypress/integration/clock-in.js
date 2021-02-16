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
});
