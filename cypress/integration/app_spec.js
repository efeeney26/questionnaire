describe('App', () => {
    it('end-to-end process', () => {
        cy.visit('/')
        cy.contains('Опросник')

        cy.get('input')
            .should('have.value', '3')
            .clear()
            .should('have.attr', 'placeholder', 'Введите значение')
            .type('kek')
            .should('have.value', '')
            .type('2')

        cy
            .get('button')
            .contains('Начать')
            .click()

        cy.contains('Вопрос 1 из 2')

        cy.get('input').check({ force: true})

        cy
            .get('button')
            .contains('Назад')
            .should('be.disabled')

        cy
            .get('button')
            .contains('Ответить')
            .click()

        cy.contains('Вопрос 2 из 2')

        cy
            .get('button')
            .contains('Назад')
            .should('not.be.disabled')
            .click()

        cy.contains('Вопрос 1 из 2')

        cy
            .get('button')
            .contains('Ответить')
            .click()

        cy.get('input').check({ force: true})

        cy
            .get('button')
            .contains('Ответить')
            .click()

        cy.contains('Всего вопросов - 2')

        cy
            .get('button')
            .contains('Попробовать еще раз!')
    })
})
