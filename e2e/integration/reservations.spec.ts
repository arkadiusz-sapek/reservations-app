describe('Reservations', () => {
    beforeEach(() => {
        cy.visit(`${Cypress.env('frontendUrl')}`);
    });

    it('should made reservation for company without reservation', () => {
        cy.contains('08:00 - 09:30').click();
        cy.contains('Reservation').should('exist');
        cy.get('[data-testid="reservationDay"]').contains('Monday (2018-07-09)');
        cy.get('[data-testid="reservationTime"]').contains('08:00-09:30');
    });

    it('should change reservation for company with reservation', () => {
        cy.contains('08:00 - 09:30').click();
        cy.contains('08:30 - 10:00').click();
        cy.get('[data-testid="modalConfirmButton"]').click();
        cy.contains('Reservation').should('exist');
        cy.get('[data-testid="reservationDay"]').contains('Monday (2018-07-09)');
        cy.get('[data-testid="reservationTime"]').contains('08:30-10:00');
    });

    it('should open removal modal and remove previously made reservation', () => {
        cy.contains('08:00 - 09:30').click();
        cy.get('[data-testid="removeReservationButton"]').click();
        cy.get('[data-testid="modalConfirmButton"]').click();
        cy.contains('No reservation').should('exist');
        cy.get('[data-testid="reservationDay"]').should('not.exist');
        cy.get('[data-testid="reservationTime"]').should('not.exist');
    });
});
