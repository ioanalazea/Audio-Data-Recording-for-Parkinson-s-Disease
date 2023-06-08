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

      cy.contains('Record').click();
      cy.contains('Record patient');

      cy.get('[title="Start recording"]').click();

      cy.wait(2000);

      cy.get('[title="Save recording"]').click();

      cy.get('audio')
      .invoke('attr', 'src')
      .then((audiofile) => {
        const audio = new Audio(audiofile);
        audio.play();
      });

    });
  });
