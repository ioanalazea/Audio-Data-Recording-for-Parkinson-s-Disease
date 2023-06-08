const patientName = 'Andrei Popescu';
const link = 'https://free214.cs.upt.ro:6060/';

describe('Successfully send delete request', () => {
    it('passes', () => {
      cy.visit(link);
      // Get an input, type e-mail
      cy.get('.MuiFormControl-root').first().type('test@yahoo.com');
  
      // Get an input, type password
      cy.get('.MuiFormControl-root').eq(1).type('test2023');
  
      cy.get('.button-style-blk').click();
  
      cy.url().should('include', '/home');

      cy.contains('See patients').click();

      cy.contains(patientName);

      cy.contains('Delete').click();

      cy.get('.swal2-deny').click();
      cy.get('.swal2-title').contains('Request sent!');
      cy.get('.swal2-confirm').click();
      cy.contains('Revoke');
    });
  });



  describe('Successfully revoke request', () => {
    it('passes', () => {
      cy.visit(link);
      // Get an input, type e-mail
      cy.get('.MuiFormControl-root').first().type('test@yahoo.com');
  
      // Get an input, type password
      cy.get('.MuiFormControl-root').eq(1).type('test2023');
  
      cy.get('.button-style-blk').click();
  
      cy.url().should('include', '/home');

      cy.contains('See patients').click();

      cy.contains(patientName);

      cy.contains('Revoke').click();

      cy.get('.swal2-deny').click();
      cy.get('.swal2-title').contains('Request sent!');
      cy.get('.swal2-confirm').click();
      cy.contains('Delete');
    });
  });