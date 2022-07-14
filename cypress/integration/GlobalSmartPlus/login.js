/// <reference types="cypress" />

describe("Login Specifcation of Global Smart Plus", ()=>{
 
    let email = "parajuli.sagar1998@gmail.com"
    let password = 'autoTest@0110'

    let invpw='ajsgdsjfasdkjasfiuew'
    let invemail='parajucvbbcvbvnb@gmail.com'
   

    // let email = userdata.email
    // let password = userdata.password

    let invNumber = 9811235917
    
    before(() => {
        cy.visit('');
        
    });
    it('Should display Invalid number', () => {
        cy.Clogin(email,password);
        
    })
})