describe('Overview Page', () => {

    it('Reaches the main page and finds basic elements', () => {
        cy.visit(`https://demo.nopcommerce.com/`)
        cy.get(`#customerCurrency`).should('be.visible') // currency selector is visible
        cy.get(`.ico-register`).contains(`Register`) // Register button is 'Register'
        cy.get(`.ico-login`).contains(`Log in`) // Login button is 'Log in'
        cy.get(`.wishlist-label`).contains(`Wishlist`) // Wishlist button is 'Wishlist
        cy.get(`#topcartlink`).contains(`Shopping cart`) // Cart is 'Shopping cart'
        cy.get(`.search-box.store-search-box`).should('be.visible') // Search box is visible
        cy.get(`button[type='submit']`).should('be.visible') // Search button is visible
        cy.get(`.header-menu`).should('be.visible') // Header Menu is visible
        cy.get(`div[class='topic-block-title'] h2`).contains(`Welcome to our store`) // Welcome to our store header is visible
        cy.get(`.category-grid.home-page-category-grid`).should('be.visible') // Welcome to our store section is visible
        cy.get(`div[class='product-grid home-page-product-grid'] div[class='title']`).contains(`Featured products`) // Featured products header is there
        cy.get(`div[class='product-grid home-page-product-grid'] div[class='item-grid']`).should('be.visible') // Featured products section is visible
        cy.get(`div[class='news-list-homepage'] strong`).contains(`News`) // News header is there
        cy.get(`.news-items`).should('be.visible') // News section is there
        cy.get(`div[class='home-page-polls'] div[class='title'] strong`).contains(`Community poll`) // Community poll is there
        cy.get(`#poll-block-1`).should('be.visible') // Community poll section is visible
        cy.get(`.footer-block.information`).should('be.visible') // Information footer section is visible
        cy.get(`.footer-block.customer-service`).should('be.visible') // Customer Service footer section is visible
        cy.get(`.footer-block.my-account`).should('be.visible') // My Account footer section is visible
        cy.get(`.social`).should('be.visible') // Social footer section is visible
        cy.get(`.newsletter`).should('be.visible') // Newsletter footer section is visible
    })

    it('Reaches the Desktop page and apply filters', () => {
        cy.visit(`https://demo.nopcommerce.com/`)
        cy.get(`.notmobile > :nth-child(1) > [href="/computers"]`).trigger('mouseover') // doing a mouseover action over the Computers part to trigger the drop-down
        cy.get(`body > div:nth-child(7) > div:nth-child(2) > ul:nth-child(1) > li:nth-child(1) > ul:nth-child(3) > li:nth-child(1) > a:nth-child(1)`).click({ force: true }) // forcing the click since the element is does not have the active state and Cypress cannot find it
        cy.url().should('contain', '/desktops') // asserting the redirect to Desktops
        cy.get(`.product-selectors`).should('be.visible') // asserting that filters are visible
        cy.get(`#products-orderby`).select(`Price: Low to High`) // selecting in the Sort By prices low to high
        cy.get(`#products-pagesize`).select(`9`) // selecting in the Sort By prices low to high
        cy.get(`a[title='List']`).click()
        cy.url().should('contain', '/desktops?viewmode=list&orderby=10&pagesize=9') // checking the URL to see if the filters are applied
    })

    it('Desktop Page > Build computer and add to cart', () => {
        cy.visit(`https://demo.nopcommerce.com/desktops?viewmode=list&orderby=10&pagesize=9`)
        cy.url().should('contain', '/desktops?viewmode=list&orderby=10&pagesize=9') // checking the URL to see if the filters are applied
        cy.get(':nth-child(2) > .product-item > .details > .product-title > a').click() // Selecting Build Your Own Computer item
        cy.url().should('contain', '/build-your-own-computer') // checking the URL for the redirect to the product
        cy.get(`.breadcrumb`).should('contain', 'Build your own computer')
        cy.get(`.product-price`).should('contain', `$1,315.00`) // checks the default price
        cy.get(`#product_attribute_1`).select(`2.2 GHz Intel Pentium Dual-Core E2200`) // changes the processor
        cy.get(`.product-price`).should('contain', `$1,300.00`) // checks the updated price
        cy.get(`#product_attribute_2`).select(`8GB [+$60.00]`) // adds the RAM
        cy.get(`.product-price`).should('contain', `$1,360.00`) // checks the updated price
        cy.get(`#product_attribute_3_7`).check() // adds the HDD  
        cy.get(`.product-price`).should('contain', `$1,460.00`) // checks the updated price
        cy.get(`#product_attribute_5_12`).check() // adds the Total Commander option
        cy.get(`.product-price`).should('contain', `$1,465.00`) // checks the updated price
        cy.get('#add-to-cart-button-1').click()
        cy.get(`.bar-notification`).should('be.visible')
    })

    it('Desktop Page > Add something else to the cart', () => {
        cy.visit(`https://demo.nopcommerce.com/build-your-own-computer`)
        cy.get('#add-to-cart-button-1').click()
        cy.get(`.bar-notification`).should('be.visible')
    })

})