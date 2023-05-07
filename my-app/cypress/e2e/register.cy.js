describe('Go to register', () => {
    it('passes', () => {
      cy.visit('http://localhost:3000/');
  
      cy.contains('Register here.').click();
  
      cy.url().should('include', '/register');

    })
  });

  describe('Register user correctly', () => {
    it('passes', () => {
      cy.visit('http://localhost:3000/');
  
      cy.contains('Register here.').click();
      
      cy.get('.MuiFormControl-root').eq(0).type('Ioana Lazea');

      cy.get('.MuiFormControl-root').eq(1).type('joannaa250@gmail.com');

      cy.get('.MuiFormControl-root').eq(2).type('07464256789');

      cy.get('.MuiFormControl-root').eq(3).type('test2023');

      cy.get('.MuiFormControl-root').eq(4).type('test2023');

      cy.contains('Create account').click();
      cy.wait(1000) // wait for 1 second
      cy.contains('Sign in');
      cy.get('.MuiFormControl-root').eq(0).type('joannaa250@gmail.com');

      // Get an input, type password
      cy.get('.MuiFormControl-root').eq(1).type('test2023');
  
      cy.get('.button-style-blk').click();
  
      cy.url().should('include', '/home');
    })
  });


  describe('E-mail already in use!', () => {
    it('passes', () => {
      cy.visit('http://localhost:3000/');
  
      cy.contains('Register here.').click();
      
      cy.get('.MuiFormControl-root').eq(0).type('Ioana Lazea');

      cy.get('.MuiFormControl-root').eq(1).type('joannaa250@gmail.com');

      cy.get('.MuiFormControl-root').eq(2).type('07464256789');

      cy.get('.MuiFormControl-root').eq(3).type('test2023');

      cy.get('.MuiFormControl-root').eq(4).type('test2023');

      cy.contains('Create account').click();

      cy.contains('E-mail already in use!');
     
    })
  });

