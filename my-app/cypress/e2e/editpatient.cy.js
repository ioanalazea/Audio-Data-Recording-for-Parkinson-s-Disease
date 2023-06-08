const patientName = 'Andrei Popescu';
const link = 'https://free214.cs.upt.ro:6060/';

describe('Successfully edit a patient', () => {
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

      cy.contains('Edit').click();
      cy.contains('Edit patient');

      cy.get('.select__control').eq(0).click({force:true});
      cy.get('.select__menu').contains('Female').click();

      cy.get('.button-style-blue').click();

     
      cy.contains('Details').click();
      cy.contains('male');
    });
  });
