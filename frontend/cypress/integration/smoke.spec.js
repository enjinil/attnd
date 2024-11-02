
describe('Smoke', () => {
  beforeEach(() => {
    cy.visit('/');
  });

  it('test', () => {
    expect("test").equal("test")
  });
});