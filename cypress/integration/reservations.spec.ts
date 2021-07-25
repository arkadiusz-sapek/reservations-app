describe('Reservations', () => {
    beforeEach(() => {
        cy.visit(`${Cypress.env('frontendUrl')}/reservations`);
    });

    it('should made reservation for company without reservation', () => {
        cy.contains('08:00 - 09:30').click();
        cy.contains('Reservation').should('exist');
        cy.get('[data-testid="reservationDay"]').should('exist');
        cy.get('[data-testid="reservationTime"]').should('exist');
        cy.contains('Monday (2018-07-09)').should('exist');
        cy.contains('08:00-09:30').should('exist');
    });

    it('should change reservation for company with reservation', () => {
        cy.contains('08:00 - 09:30').click();
        cy.contains('08:30 - 10:00').click();
        cy.get('[data-testid="modalConfirmButton"]').click();

        cy.contains('Reservation').should('exist');
        cy.get('[data-testid="reservationDay"]').should('exist');
        cy.get('[data-testid="reservationTime"]').should('exist');
        cy.contains('Monday (2018-07-09)').should('exist');
        cy.contains('08:30-10:00').should('exist');
    });

    it('should open removal modal and remove previously made reservation', () => {
        cy.contains('08:00 - 09:30').click();
        cy.get('[data-testid="removeReservationButton"]').click();
        cy.get('[data-testid="modalConfirmButton"]').click();

        cy.contains('No reservation').should('exist');
        cy.get('[data-testid="reservationDay"]').should('not.exist');
        cy.get('[data-testid="reservationTime"]').should('not.exist');
        cy.contains('Monday (2018-07-09)').should('not.exist');
        cy.contains('08:00-09:30').should('not.exist');
    });
});
