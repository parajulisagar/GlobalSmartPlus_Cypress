describe("Complain Specifcation of Global Smart Plus", ()=>{
 
    let email = "sagar123@yopmail.com"
    let password = 'autoTest@0110'
    before(function () {
        cy.visit('')
        cy.wait(2000)
        cy.fixture('credentials').then((cred)=>{
            this.cred = cred;
        })
        cy.get("body").then($body => {
            if ($body.find('.modal-title').length > 0){
                cy.wait(1000)
                cy.get('#ok').click()
                cy.wait(1000)
                if ($body.find('[data-test="userDataField"]').length > 0) {   //evaluates as true
                    cy.Clogin(email, password);      
                    }
            }
            else if ($body.find('[data-test="userDataField"]').length > 0) {   //evaluates as true
                cy.Clogin(email, password);      
                }
        })
    });
    it('Successfull complain', function (){
        
        cy.fixture('credentials').then((cred)=>{
            cy.visit('/dashboard/complain')
        cy.get('.form-row > :nth-child(1) > .form-control').click().type(email)
        cy.get('[name="categoryName"]').select('E-Bannking')
            cy.get(':nth-child(3) > .form-control').type(cred.amount)
            cy.get('.button').click()
        cy.get('.Toastify__toast-body').contains('Complain Sent Successfully')
        cy.screenshot()
        })
        
        
    });
})