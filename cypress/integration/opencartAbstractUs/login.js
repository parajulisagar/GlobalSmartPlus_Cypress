
/// <reference types="cypress" />

describe("Login Specifcation of opencart.abstract.us", ()=>{
    beforeEach(() => {
        cy.visit("https://opencart.abstracta.us/index.php?route=account/login")
    });
    let valemail= 'parajul.sagar@gmail.com'
    let invpw='ajsgdsjfasdkjasfiuew'
    let invemail='paraju@gmail.com'
    let valpass='samsungiphone'
    let arr=[''+`${invemail}`+':'+`${invpw}`+': Warning: No match for E-Mail Address and/or Password.',
             ''+`${invemail}`+':'+'{backspace}'+': Warning: No match for E-Mail Address and/or Password.',
             ''+`${invemail}`+':'+`${valpass}`+': Warning: No match for E-Mail Address and/or Password.',
             ''+'{backspace}'+':'+`${invpw}`+': Warning: No match for E-Mail Address and/or Password.',
             ''+'{backspace}'+':'+'{backspace}'+': Warning: No match for E-Mail Address and/or Password.',
             ''+'{backspace}'+':'+`${valpass}`+': Warning: No match for E-Mail Address and/or Password.',
             ''+`${valemail}`+':'+`${invpw}`+': Warning: No match for E-Mail Address and/or Password.',
             ''+`${valemail}`+':'+'{backspace}'+': Warning: No match for E-Mail Address and/or Password.',
             ''+`${valemail}`+':'+`${valpass}`+':My Account',
        ]

    var Emails=[]
    var Passwords=[]
    var Tests=[]
    
    for(var j=0;j<arr.length;j++){
        var prop = arr[j].split(':')
        var creds = prop
        var Email = creds[0]
        var Password= creds[1]
        var Test1= creds[2]
        var Test2= creds[3]
        var Test=Test1+":"+Test2
        Emails.push(Email)
        Passwords.push(Password)
        Tests.push(Test)
        
    }

    for (let i = 0; i< arr.length ; i++) {
        let e = String(Emails[i])
        let p = String(Passwords[i])
        let t = String(Tests[i])
        it('should display '+ Tests[i], () => {
            cy.Elogin(e,p)
            if(i<8){
                cy.get('.alert').contains(t)
            }
            else{
                cy.get('h2').contains("My Account")
            } 
        });
    }
})