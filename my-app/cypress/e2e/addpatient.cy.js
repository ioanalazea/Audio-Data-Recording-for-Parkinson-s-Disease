const patientName = 'Andrei Popescu';
const link = 'https://free214.cs.upt.ro:6060/';

describe('Successfully add a patient', () => {
    it('passes', () => {
      cy.visit(link);
      // Get an input, type e-mail
      cy.get('.MuiFormControl-root').first().type('test@yahoo.com');
  
      // Get an input, type password
      cy.get('.MuiFormControl-root').eq(1).type('test2023');
  
      cy.get('.button-style-blk').click();
  
      cy.url().should('include', '/home');

      cy.contains('Add patient').click();

      
      cy.get('.MuiFormControl-root').eq(0).type(patientName);

      cy.get('.MuiFormControl-root').eq(1).type('0741564534');

      cy.get('.MuiFormControl-root').eq(2).type('65');

      cy.get('.select__control').eq(0).click({force:true});
      cy.get('.select__menu').contains('Female').click();

      cy.get('.MuiFormControl-root').eq(3).type('170');

      cy.get('.MuiFormControl-root').eq(4).type('60');

      cy.get('.select__control').eq(1).click();
      cy.get('.select__menu').contains('Stage 3 Parkinson\'s').click({force:true});

      cy.get('.select__control').eq(2).click();
      cy.get('.select__menu').contains('Tremor').click({force:true});

      cy.get('.MuiFormControl-root').eq(5).type('Diabetes');
      cy.contains('Diabetes insipidus').click({force:true});

      cy.get('.MuiAutocomplete-root').eq(1).click();
      cy.contains('Abacavir').click({force:true});

      cy.get('.MuiFormControl-root').eq(7).type('Test');

      cy.get('.MuiFormControl-root').eq(8).type('Test');

      cy.get('.button-style-blue').click();

      cy.wait(1000);

      cy.contains('See patients').click();

      cy.contains(patientName);
      
    });
  });