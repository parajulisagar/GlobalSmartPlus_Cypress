describe("FundTransfer Specifcation of Global Smart Plus", ()=>{
 
    let email = "sagar@yopmail.com"
    let password = 'autoTest@0110'
   
    before(() => {
        cy.visit('');
        
        cy.Clogin(email, password);
    });
    it('Successfull complain', () => {
        cy.visit('/dashboard/complain')
        cy.get(':nth-child(1) > .form-control').click().type(email)
        cy.get('[name="categoryName"]').select('E-Bannking')
        cy.get(':nth-child(3) > .form-control').type('Automation Complain by sagar parajuli')
        cy.get('.button').click()
        cy.get('.Toastify__toast-body').contains('Complain Sent Successfully')
    });
})