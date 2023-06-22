const link = 'https://free214.cs.upt.ro:6060/';

describe('Visit website', () => {
  it('passes', () => {
    cy.visit(link);
  })
});

describe('Log in', () => {
  it('passes', () => {
    cy.visit(link);
    // Get an input, type e-mail
    cy.get('.MuiFormControl-root').first().type('lazeaioanabianca@gmail.com');

    // Get an input, type password
    cy.get('.MuiFormControl-root').eq(1).type('ioana20');

    cy.get('.button-style-blk').click();

    cy.url().should('include', '/home');
    
  })
});

describe('Go to forgot password', () => {
  it('passes', () => {
    cy.visit(link);
   
    cy.contains('Forgot your password?').click();

    cy.url().should('include', '/resetpassword');
    
    cy.contains('Go back').click();
  })
});

describe('Error: empty fields', () => {
  it('passes', () => {
    cy.visit(link);
    cy.get('.button-style-blk').click();
   
    cy.contains('Empty fields!');
  })
});


describe('Error: invalid e-mail', () => {
  it('passes', () => {
    cy.visit(link);

    cy.get('.MuiFormControl-root').first().type('aaaaa');

    cy.get('.MuiFormControl-root').eq(1).type('aaaa');

    cy.get('.button-style-blk').click();

    cy.contains('Email is invalid!');

  })
});



describe('Error: wrong password', () => {
  it('passes', () => {
    cy.visit(link);
    // Get an input, type e-mail
    cy.get('.MuiFormControl-root').first().type('lazeaioanabianca@gmail.com');

    // Get an input, type password
    cy.get('.MuiFormControl-root').eq(1).type('aaaaa');

    cy.get('.button-style-blk').click();

    cy.contains('Wrong password!');

  })
});