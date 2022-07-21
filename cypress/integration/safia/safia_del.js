const legal = 'Newman company'
const point = 'Старомосковская'
const dep = 'Часовики'
const position = 'Часовик'


describe('Delete test creations', function() {
          beforeEach('Login', function(){
                    cy.visit('https://test.admin.safia.udevs.io/')
                    cy.get('#normal_login_username')
                              .type('admin1')
                              .should('have.value', 'admin1')
                    cy.get('.ant-input-suffix > .anticon > svg').click()
                    cy.get('#normal_login_password')
                              .type('admin1234')
                              .should('have.value', 'admin1234')
                    cy.get('.ant-btn-primary').click()
                    cy.wait(2000)
                    cy.get('.anticon-menu-unfold > svg').click()
                    cy.contains('Настройки').click()
                    cy.get('.anticon-menu-unfold > svg').click()
                    cy.contains('Компания').click()
          })
          
          // it('Delete login', function() {
          //           cy.contains('Юр лица').click()
          //           cy.contains(legal).click()
          //           cy.get('.archive > .ant-btn').click()
          //           cy.contains(legal)
          //                     .should('not.exist')
          // })

          // it('Delete point', function() {
          //           cy.contains('Филиалы').click()
          //           cy.get('.ant-input').click()
          //                     .type(point)
          //           cy.get('.ant-input-group-addon > .ant-btn > .anticon > svg').click()
          //           cy.contains(point).click()
          //           cy.get('.archive > .ant-btn').click()
          // })

          // it('Delete department', function() {
          //           cy.contains('Отдел').click()
          //           cy.contains(dep).click()
          //           cy.contains(dep).click()
          //           cy.get('.archive > .ant-btn').click()
          // })

          it('Delete position', function(){
                cy.contains('Должности').click()
                cy.contains(position).click()
                cy.get('.top_content > div > :nth-child(3)').click()
                cy.get('.black-list-btn').click()
          })
})

export default describe