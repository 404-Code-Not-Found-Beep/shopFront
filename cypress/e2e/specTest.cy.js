import items from "../fixtures/items.json";

describe("testing shop app", () => {
  context("testing 200 status", () => {
    it("tests the status of the home page", () => {
      cy.request({ url: "/", followRedirect: true }).then((res) => {
        expect(res.status).to.eq(200);
      });
    });
  });

  context("tests elements", () => {
    it("finds 3 elements and tests they render correctly", () => {
      cy.visit("/");
      cy.getByData("homePageBanner");
      cy.getByData("selectSize");
      cy.getByData("searchBar");
    });
  });

  context("Gets info from an element", () => {
    it("visits books page and gets number of items info", () => {
      cy.visit("/books");
      cy.getByData("bookItems");
      cy.getByData("bookAddCart").should("have.length", 2);
    });
  });

  context("adding item to cart", () => {
    it("Visits the a single shirt and clicks basket", () => {
      cy.visit("/6391ff66938ac5b34c226a1c");
      cy.getByData("selectSize").select("M");
      cy.getByData("quantityInput").clear().type("2");
      cy.get("[data-cy='cartAdd']").click();
      cy.getByData("checkoutButton").click();
      cy.getByData("itemInCart");
    });
  });
  context("tests cart maths", () => {
    it("checks the tax is correct", () => {
      cy.visit("/6391ff66938ac5b34c226a1c");
      cy.getByData("selectSize").select("L");
      cy.get("[data-cy='cartAdd']").click();
      cy.getByData("checkoutButton").click();
      cy.getByData("priceOfItem").contains("65");
      cy.getByData("itemTax").contains("6.5");
    });
  });
  context("Adds and then removes item from checkout", () => {
    it("finds and clicks the remove button in cart", () => {
      cy.visit("/6391ff66938ac5b34c226a1c");
      cy.getByData("selectSize").select("M");
      cy.getByData("quantityInput").clear().type("1");
      cy.get("[data-cy='cartAdd']").click();
      cy.getByData("checkoutButton").click();
      cy.getByData("itemInCart");
      cy.getByData("removeButton").click();
    });
  });
  context("visits management portal and creates item", () => {
    it("navigates to management portal and creates a new book using mock db", () => {
      cy.visit("/manager-portal");
      cy.url().should("include", "/manager-portal");
      cy.intercept("GET", "http://localhost:5200/items", {
        fixture: "items.json",
      });
      cy.getByData("managerAddNew").click();
      cy.getByData("itemNameInputForm").type("Mock test Book");
      cy.getByData("itemPriceInputForm").type("10");
      cy.getByData("itemNoImageinputButton").click();
      cy.getByData("itemBookRadioButton").click();
      cy.readFile("cypress/fixtures/items.json").then((items) => {
        items.push({
          name: "mock test Shirt",
          url: "../../assets/creatorShirt.png",
          price: 35,
        });
        cy.writeFile("cypress/fixtures/items.json", items);
      });
      cy.intercept("POST", "http://localhost:5200/items", {
        fixture: "items.json",
      });
      cy.getByData("itemAddButton").click();
      cy.intercept("GET", "http://localhost:5200/items", {
        fixture: "items.json",
      });
      cy.getByData("managerPortalButton").click();
      cy.getByData("itemEditButton");
    });
  });

  context("visits management portal and edits item", () => {
    it("navigates to management portal and edits an item", () => {
      cy.intercept("GET", "http://localhost:5200/items", {
        fixture: "items.json",
      });
      cy.visit("/manager-portal");
      cy.wait(1000);
      cy.url().should("include", "/manager-portal");
      cy.wait(1000);
      cy.intercept(
        "GET",
        "http://localhost:5200/items/6391ff66938ac5b34c226a1c",
        { body: items[0] }
      );
      cy.wait(1000);
      cy.getByData("itemEditButton").first().click();
      let testData = "Mock test shirt re-written";
      cy.getByData("itemNameInputForm").clear().type(testData);
      cy.wait(1000);
      cy.readFile("cypress/fixtures/items.json").then((items) => {
        items[0].name = testData;
        cy.writeFile("cypress/fixtures/items.json", JSON.stringify(items));
      });
      cy.wait(1000);
      cy.getByData("itemShirtRadioButton").click();
      cy.wait(500);
      cy.intercept(
        "PUT",
        "http://localhost:5200/items/6391ff66938ac5b34c226a1c",
        { body: items[0] }
      );
      cy.wait(1000);
      cy.getByData("itemAddButton").click();
      cy.wait(1000);
    });
  });

  context("Visits management portal and deletes an item", () => {
    it("Navigates to management portal and deletes the last item", () => {
      cy.intercept("GET", "http://localhost:5200/items", {
        fixture: "items.json",
      });
      cy.visit("/manager-portal");
      cy.url().should("include", "/manager-portal");
      //delete
      cy.readFile("cypress/fixtures/items.json").then((items) => {
        items.pop();
        cy.writeFile("cypress/fixtures/items.json", items);
      });
      cy.intercept("DELETE", "http://localhost:5200/items", {
        fixture: "items.json",
      });
      cy.getByData("itemDeleteButton").last().click();
      cy.intercept("GET", "http://localhost:5200/items", {
        fixture: "items.json",
      });
    });
  });
});
