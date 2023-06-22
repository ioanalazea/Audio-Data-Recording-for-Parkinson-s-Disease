const link = 'https://free214.cs.upt.ro:6060/';


describe('Go to register', () => {
    it('passes', () => {
      cy.visit(link);
  
      cy.contains('Register here.').click();
  
      cy.url().should('include', '/register');

    })
  });

  describe('Register user correctly', () => {
    it('passes', () => {
      cy.visit(link);
  
      cy.contains('Register here.').click();
      
      cy.get('.MuiFormControl-root').eq(0).type('Ioana');

      cy.get('.MuiFormControl-root').eq(1).type('Lazea');

      cy.get('.MuiFormControl-root').eq(2).type('joanna_2017@yahoo.com');

      cy.get('.MuiFormControl-root').eq(3).type('07464256789');

     cy.get('.select__control').eq(0).click().type('United Kingdom');
     cy.get('.select__menu').contains('United Kingdom').click({force:true});

     cy.get('.select__control').eq(1).should('have.css', 'pointer-events', 'none')

     cy.get('.select__control').eq(2).should('have.css', 'pointer-events', 'none')

     cy.get('.MuiFormControl-root').eq(4).type('test2023');

     cy.get('.MuiFormControl-root').eq(5).type('test2023');

     cy.get('.MuiFormControl-root').eq(6).type('dfd97d0a-283b-460b-9bb7-b03169834fa5');
     
     cy.contains('Create account').click();
     cy.wait(3000);
    })
  });



  describe('Token is not valid!', () => {
    it('passes', () => {
      cy.visit(link);
  
      cy.contains('Register here.').click();
      
      cy.get('.MuiFormControl-root').eq(0).type('Ioana');

      cy.get('.MuiFormControl-root').eq(1).type('Lazea');

      cy.get('.MuiFormControl-root').eq(2).type('joanna_2017@yahoo.com');

      cy.get('.MuiFormControl-root').eq(3).type('07464256789');

     cy.get('.select__control').eq(0).click().type('United Kingdom');
     cy.get('.select__menu').contains('United Kingdom').click({force:true});

     cy.get('.select__control').eq(1).should('have.css', 'pointer-events', 'none')

     cy.get('.select__control').eq(2).should('have.css', 'pointer-events', 'none')

     cy.get('.MuiFormControl-root').eq(4).type('test2023');

     cy.get('.MuiFormControl-root').eq(5).type('test2023');

     cy.get('.MuiFormControl-root').eq(6).type('dfd97d0a-283b-460b-9bb7-b03169834fa5');
     
     cy.contains('Create account').click();

     cy.contains('Token used already!');
    })
  });

  describe('Doctor does not exist', () => {
    it('passes', () => {
      cy.visit(link);
  
      cy.contains('Register here.').click();
      
      cy.get('.MuiFormControl-root').eq(0).type('Ioana');

      cy.get('.MuiFormControl-root').eq(1).type('Lazea');

      cy.get('.MuiFormControl-root').eq(2).type('joanna_2017@yahoo.com');

      cy.get('.MuiFormControl-root').eq(3).type('07464256789');

     cy.get('.select__control').eq(0).click().type('Romania');
     cy.get('.select__menu').contains('Romania').click({force:true});

     cy.get('.select__control').eq(1).click().type('Neurology');
     cy.get('.select__menu').contains('Neurology').click({force:true});

     cy.get('.select__control').eq(2).click().type('Hunedoara');
     cy.get('.select__menu').contains('Hunedoara').click({force:true});

     cy.get('.MuiFormControl-root').eq(4).type('test2023');

     cy.get('.MuiFormControl-root').eq(5).type('test2023');

     cy.get('.MuiFormControl-root').eq(6).type('59b2b289-d835-424e-b683-442e0b8a1cd2');
     
     cy.contains('Create account').click();

     cy.contains('Doctor does not exist.');
    })
  });

  describe('Doctor wrong specialization', () => {
    it('passes', () => {
      cy.visit(link);
  
      cy.contains('Register here.').click();
      
      cy.get('.MuiFormControl-root').eq(0).type('Stefan');

      cy.get('.MuiFormControl-root').eq(1).type('Mihaicuta');

      cy.get('.MuiFormControl-root').eq(2).type('joanna_2017@yahoo.com');

      cy.get('.MuiFormControl-root').eq(3).type('07464256789');

     cy.get('.select__control').eq(0).click().type('Romania');
     cy.get('.select__menu').contains('Romania').click({force:true});

     cy.get('.select__control').eq(1).click().type('Neurology');
     cy.get('.select__menu').contains('Neurology').click({force:true});

     cy.get('.select__control').eq(2).click().type('Timiș');
     cy.get('.select__menu').contains('Timiș').click({force:true});

     cy.get('.MuiFormControl-root').eq(4).type('test2023');

     cy.get('.MuiFormControl-root').eq(5).type('test2023');

     cy.get('.MuiFormControl-root').eq(6).type('59b2b289-d835-424e-b683-442e0b8a1cd2');
     
     cy.contains('Create account').click();

     cy.contains('Wrong specialization.');
    })
  });


  describe('Doctor wrong county', () => {
    it('passes', () => {
      cy.visit(link);
  
      cy.contains('Register here.').click();
      
      cy.get('.MuiFormControl-root').eq(0).type('Stefan');

      cy.get('.MuiFormControl-root').eq(1).type('Mihaicuta');

      cy.get('.MuiFormControl-root').eq(2).type('joanna_2017@yahoo.com');

      cy.get('.MuiFormControl-root').eq(3).type('07464256789');

     cy.get('.select__control').eq(0).click().type('Romania');
     cy.get('.select__menu').contains('Romania').click({force:true});

     cy.get('.select__control').eq(1).click().type('Pulmonology');
     cy.get('.select__menu').contains('Pulmonology').click({force:true});

     cy.get('.select__control').eq(2).click().type('Hunedoara');
     cy.get('.select__menu').contains('Hunedoara').click({force:true});

     cy.get('.MuiFormControl-root').eq(4).type('test2023');

     cy.get('.MuiFormControl-root').eq(5).type('test2023');

     cy.get('.MuiFormControl-root').eq(6).type('59b2b289-d835-424e-b683-442e0b8a1cd2');
     
     cy.contains('Create account').click();

     cy.contains('Wrong county, specialization or name is incomplete.');
    })
  });

  describe('Doctor has created an account successfully.', () => {
    it('passes', () => {
      cy.visit(link);
  
      cy.contains('Register here.').click();
      
      cy.get('.MuiFormControl-root').eq(0).type('Stefan');

      cy.get('.MuiFormControl-root').eq(1).type('Mihaicuta');

      cy.get('.MuiFormControl-root').eq(2).type('test@yahoo.com');

      cy.get('.MuiFormControl-root').eq(3).type('07464256789');

     cy.get('.select__control').eq(0).click().type('Romania');
     cy.get('.select__menu').contains('Romania').click({force:true});

     cy.get('.select__control').eq(1).click().type('Pulmonology');
     cy.get('.select__menu').contains('Pulmonology').click({force:true});

     cy.get('.select__control').eq(2).click().type('Timiș');
     cy.get('.select__menu').contains('Timiș').click({force:true});

     cy.get('.MuiFormControl-root').eq(4).type('test2023');

     cy.get('.MuiFormControl-root').eq(5).type('test2023');

     cy.get('.MuiFormControl-root').eq(6).type('77b01b36-f0bb-4c7c-be55-c1afdc8b74c1');
     
     cy.contains('Create account').click();
     cy.wait(3000);
    })
  });

  describe('Show error multiple empty fields', () => {
    it('passes', () => {
      cy.visit(link);
      cy.contains('Register here.').click();
      cy.contains('Create account').click();
      cy.contains('Multiple empty fields!');
    })
  })

