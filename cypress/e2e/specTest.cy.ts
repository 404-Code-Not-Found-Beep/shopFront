describe("testing shop app", () => {
    // beforeEach(() => {
    //     cy.visit("http://localhost:4200");
    // })
    context("tests elements", () => {
        it("finds elements and tests they render correctly", () =>{
            cy.visit("http://localhost:4200");

            });
        });
 
    context("adding item to cart", () => {
        it("Visits the a single shirt and clicks basket", () => {
            cy.visit("http://localhost:4200/6391ff21938ac5b34c226a18");
    
            // cy.contains("Items").click();
            // cy.contains("").click();
    
            // cy.get("[data-cy='selectSize']").select('M');
            cy.getByData("selectSize").select('M');
            cy.getByData("quantityInput").clear().type('2');
            cy.get("[data-cy='cartAdd']").click();
            cy.getByData("checkoutButton").click();
            cy.getByData("itemInCart");
        });
 
    })
    context("testing 200 status", () =>{
        it("tests the status of the home page", () => {
            cy.request({url: "http://localhost:4200", followRedirect: true}).then((res) => {
                expect(res.status).to.eq(200);
                // expect(res.redirectedToUrl).to.eq("http://localhost:4200/home")
            });
        });
 
    })
    
    // it("visits the checkout page and checks item is present", () => {
    //     cy.visit("http://localhost:4200/checkout");
    //     cy.getByData("Be Curious Shirt");
    // })

    // it.only("testing only", () => {
    //     cy.
    //     cy.get("[data-cy='cartAdd']");
    // }) ;
});