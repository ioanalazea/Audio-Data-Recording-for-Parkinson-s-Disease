describe('Visit website', () => {
  it('passes', () => {
    cy.visit('http://localhost:3000/')
  })
})

describe('Log in', () => {
  it('passes', () => {
    cy.visit('http://localhost:3000/');
    // Get an input, type e-mail
    cy.get('.MuiFormControl-root').first().type('lazeaioanabianca@gmail.com');

    // Get an input, type password
    cy.get('.MuiFormControl-root').eq(1).type('ioana20');

    cy.get('.button-style-blk').click();

    cy.url().should('include', '/home');
    
  })
})

describe('Go to forgot password', () => {
  it('passes', () => {
    cy.visit('http://localhost:3000/');
   
    cy.contains('Forgot your password?').click();

    cy.url().should('include', '/resetpassword');
    
    cy.contains('Go back').click();
  })
})