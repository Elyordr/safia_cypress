import 'cypress-file-upload'

const resizeObserverLoopErrRe = /^[^(ResizeObserver loop limit exceeded)]/
Cypress.on('uncaught:exception', (err) => {
    /* returning false here prevents Cypress from failing the test */
    if (resizeObserverLoopErrRe.test(err.message)) {
        return false
    }
})

const characters ='ABCDEFGHIJKLMNOPQRSTUVWXYZ';

function generateString(length) {
    let result = ' ';
    const charactersLength = characters.length;
    for ( let i = 0; i < length; i++ ) {
        result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }

    return result;
}

var randomFixedInteger = function (length) {
  return Math.floor(Math.pow(10, length-1) + Math.random() * (Math.pow(10, length) - Math.pow(10, length-1) - 1));
}

const new = 'new something'
const point = 'Старомосковская'
const address = 'Rayon'
const new_address = 'Rayon Archakuchinskiy'
const legal = 'Newman company'
const dep = 'Часовики'
const poll ='Опрос для Часовиков'
const position = 'Часовик'
const name1 = generateString(3)
const lastname = 'Lapov'
const passport = 'passport.jpg'
const avatar = 'Screenshot_4-6.jpg'
const phonenum = randomFixedInteger(9)
const inn = randomFixedInteger(12)
const test = 'this text created to test git'

describe('Admin panel test', function(){
  
          beforeEach('Login', function(){
                    //Войти в систему
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
          })

          it('Settings edits', function() {
                    //Войти в настройки
                    cy.get('.anticon-menu-unfold > svg').click()
                    cy.contains('Настройки').click()
                    cy.url()
                              .should('include', 'https://test.admin.safia.udevs.io/settings/poll')
                    cy.get('.anticon-menu-unfold > svg').click()
                    cy.contains('Компания').click()
                    cy.contains('Филиалы').click()


                    //Добавить Филиал
                    cy.get('.ant-btn-primary').click()
                    cy.url()
                              .should('include', 'https://test.admin.safia.udevs.io/settings/company')

                              //Сохранить
                    cy.get('#name')
                              .type(point)
                              .should('have.value', point)
                    cy.get(':nth-child(3) > .ant-row > .ant-form-item-control > .ant-form-item-control-input > .ant-form-item-control-input-content > .ant-select > .ant-select-selector').click()
                    cy.contains('Andijon').click()
                    cy.get('.ymaps-2-1-79-events-pane').trigger('pointerdown', {clientX: 1500, clientY: 500}).click()
                              
                    cy.get('.ant-btn-primary').click()
                    cy.wait(2000)

                              //Проверить через поиск
                    cy.get('.ant-input').click()
                              .type(point)
                    cy.get('.ant-input-group-addon > .ant-btn > .anticon > svg').click()
                    cy.contains(point).click()


                    //Добавить Юр.лицо
                    cy.contains('Юр лица').click()
                    cy.url()
                              .should('include', 'https://test.admin.safia.udevs.io/settings/jurfaces')

                              //Сбросить
                    cy.get('.ant-btn-primary').click()
                    cy.url()
                              .should('include', 'https://test.admin.safia.udevs.io/settings/jurfaces/create')
                    cy.get('#name')
                              .type('Newman company')
                              .should('have.value', 'Newman company')
                    cy.get('.deny-btn').click()

                              //Сохранить
                    cy.get('.ant-btn-primary').click()
                    cy.url()
                              .should('include', 'https://test.admin.safia.udevs.io/settings/jurfaces/create')
                    cy.get('#name')
                              .type(legal)
                              .should('have.value', legal)
                    cy.get('#address')
                              .type(address)
                              .should('have.value', address)
                    cy.get('#mfo')
                              .type('123456789')
                              .should('have.value', '123456789')
                    cy.get('#inn')
                              .type('0987654321')
                              .should('have.value', '0987654321')           
                    cy.get('.ant-btn-primary').click()
                    cy.wait(3000)

                              //Проверить через поиск
                    cy.get('.ant-input').click()
                              .type(legal)
                    cy.get('.ant-input-group-addon > .ant-btn > .anticon > svg').click()
                    cy.contains(legal).click()

                              //Редактирование
                    cy.get('.ant-card-extra > .ant-btn').click()
                    cy.get('#address').click()
                              .clear()
                              .type(new_address)
                    cy.get('#mfo').click()
                              .clear()
                              .type('55667788')
                    cy.get('.ant-btn-primary').click()
                    cy.wait(3000)

                              //Проверка
                    cy.get('.ant-input').click()
                              .type(legal)
                    cy.get('.ant-input-group-addon > .ant-btn > .anticon > svg').click()
                    cy.contains(legal).click()
                    cy.contains(new_address)
                    cy.contains('55667788')
                              //Удаление
                    // cy.get('.archive > .ant-btn').click()
                    // cy.wait(3000)
                    
                    //           //Проверка
                    // cy.get('.ant-input').click()
                    //           .type(legal)
                    // cy.contains(legal)
                    //           .should('not.exist')

          })

          it('Department creation', function() {
                    // Создание отдела
                    cy.get('.anticon-menu-unfold > svg').click()
                    cy.contains('Настройки').click()
                    cy.url()
                              .should('include', 'https://test.admin.safia.udevs.io/settings/poll')
                    cy.get('.anticon-menu-unfold > svg').click()
                    cy.contains('Компания').click()
                    cy.contains('Отдел').click()
                    cy.get('.ant-btn-primary').click()
                    cy.get('#name').click()
                              .type(dep)
                    cy.get('.ant-select-selector').click()
                    cy.contains('Umidjon Kodirov').click()
                    cy.get('.ant-btn-primary').click()

                              //Проверка
                    // cy.contains(dep).click()
                    // cy.get('ant-col ant-col-8.p')
                    //           .should('have.value', dep)
                    // cy.get(':nth-child(2) > :nth-child(2) > p')
                    //           .should('have.value', 'Umidjon Kodirov')

                              //Редактирование
                    cy.contains(dep).click()
                    cy.get('.ant-card-extra > .ant-btn').click()
                    cy.get('.ant-select-selector').click()
                    cy.contains('andi andinov').click()
                    cy.get('.ant-btn-primary').click()
                    
                              //Проверка
                    // cy.contains(dep).click()
                    // cy.get('.ant-card-body > :nth-child(2) > :nth-child(2)')
                    //           .should('have.value', 'andi andinov')

                              //Удаление
                    // cy.contains(dep).click()
                    // cy.get('.archive > .ant-btn').click()

                    //           //Проверка
                    // cy.contains(dep)
                    //           .should('not.exist')
          })

          it('Создание опроса', function(){

                 // Создание Опроса
                 cy.get('.anticon-menu-unfold > svg').click()
                 cy.contains('Настройки').click()
                 cy.get('.anticon-menu-unfold > svg').click()
                 cy.contains('Рекрутинг').click()
                 cy.contains('Опрос').click()
                 cy.get('.ant-card-extra > div > .ant-btn').click()
                 cy.get('.ant-col > .ant-input').click()
                     .type(poll)
                 cy.get('.add-question-btn').click()
                 cy.get(':nth-child(7) > .question-wrapper > .ant-input').click()
                     .type('Где вы бы хотели жить будь у вас такая возможность?')
                 cy.get(':nth-child(7) > .answers > :nth-child(1) > .ant-input').click()
                     .type('Польша')
                 cy.get(':nth-child(7) > .answers > :nth-child(2) > .ant-input').click()
                     .type('США')
                 cy.get('.footer > .ant-btn-primary').click()
                 
                     //Проверка
                 cy.contains(poll).click()
                 cy.contains('Где вы бы хотели жить будь у вас такая возможность?')

                //     //Удаление
                //  cy.get('.ant-btn-dangerous').click()
                //  cy.get('.ant-popover-buttons > .ant-btn-primary').click()
                //  cy.contains(poll)
                //      .should('not.exist')
          })

          it('Position creating', function() {

                    // Создание Должности
                cy.get('.anticon-menu-unfold > svg').click()
                cy.contains('Настройки').click()
                cy.get('.anticon-menu-unfold > svg').click()
                cy.contains('Компания').click()
                cy.contains('Должности').click()
                cy.get('.ant-btn-primary').click()
                cy.get('#position_name').click()
                    .type(position)
                cy.get('.ant-btn-primary').click()

                    //Проверка
                cy.contains(position).click()
                cy.get('.top_content > div > :nth-child(3)').click()
                cy.get('#position_name')
                    .should('have.value', position)
                

                    //Добавление уровня должности
                cy.get('.breadcrumb_wrapper > .anticon > svg').click()
                cy.get('.top_content > div > :nth-child(2)').click()
                cy.get('#general_provision_ru').click()
                    .type('some info about position')
                cy.get('.ant-select-selector').click()
                cy.contains('Uchtepa').click()
                cy.get('[style="margin: 0px; row-gap: 0px;"] > .styled-tab > .ant-tabs > .ant-tabs-nav > .ant-tabs-nav-wrap > .ant-tabs-nav-list > :nth-child(2)').click()
                cy.get('#general_provision_uz').click()
                    .type('some info about position')
                cy.get('.save-btn').click()
                cy.get('.ant-col-8 > .ant-row > .ant-form-item-control > .ant-form-item-control-input > .ant-form-item-control-input-content > .ant-select > .ant-select-selector').click()
                cy.get('[title="New"] > .ant-select-item-option-content').click()
                cy.get('.custom-footer > .ant-btn').click()

          })

          it('Job creation', function(){

                //Создание вакансии
            cy.get('.ant-tabs-extra-content > .ant-btn').click()
            cy.wait(1000)
            cy.get(':nth-child(1) > .ant-select-selector > .ant-select-selection-overflow').click().type(position)
            cy.get('.ant-select-item-option-active > .ant-select-item-option-content').click()
            cy.get(':nth-child(2) > .ant-select-selector').click().type(point)
            cy.get('[style=""] > .rc-virtual-list-holder-inner > .ant-select-item-option-active > .ant-select-item-option-content').click()
            cy.get(':nth-child(3) > .count-card > :nth-child(3)').click()
            cy.get('.breadcrumb_wrapper > .anticon > svg').click()

                //Проверка
            cy.get('.ant-select-selector').click()
            cy.contains('100 / стр.').click()
            cy.contains(point)
              .should('be.visible')
          })

          it('Candidate creating', function() {

                //Создание кандидата
            cy.get('.ant-card-body > :nth-child(1) > :nth-child(1) > :nth-child(1) > .ant-tabs-nav-wrap > .ant-tabs-nav-list > :nth-child(2)').click()
            cy.url()
              .should('include', 'https://test.admin.safia.udevs.io/recruiting/created')
            cy.get('[style="margin-bottom: 15px;"] > .ant-btn').click()
            cy.get('#name').click()
              .type(name1)
            cy.get('#lastName').click()
              .type(lastname)
            cy.get('.PhoneInput').click()
              .type(phonenum)
            cy.get('input[type="date"]').first().type('2002-12-30')
            cy.wait(4000)
            cy.get('#branch').click()
              .type(point)
            cy.contains(point).click()
            cy.get('#position_id').click()
              .type(position)
            cy.contains(position).click()
            cy.get('#gender').click()
            cy.contains('Мужчина').click()
            cy.get('#additional_phone_number').click()
              .type('+99877').type(randomFixedInteger(7))
            cy.get('#pin').click()
              .type(randomFixedInteger(16))
            cy.get('#doc_series').click()
              .type('AB')
            cy.get('#doc_number').click()
              .type(randomFixedInteger(7))
            cy.get('#expireDate').click()
              .type('2040-11-12')
            cy.get(':nth-child(1) > .ant-row > .ant-form-item-control > .ant-form-item-control-input > .ant-form-item-control-input-content > .ant-select > .ant-select-selector').click()
            cy.contains('Алмазарский район').click()
            cy.get('#street').click()
              .type(address)
            cy.get('#house').click()
              .type(randomFixedInteger(2))
            cy.get('input[type=file]').attachFile(passport)
            cy.get('input[type=file]').eq(1).attachFile(avatar)
            cy.get('input[type=file]').eq(2).attachFile(avatar)
            cy.wait(5000)
            cy.get('.ant-btn-primary').click()
            cy.wait(3000)
            cy.get(':nth-child(1) > .ant-form-item-control > .ant-form-item-control-input > .ant-form-item-control-input-content > .ant-col > .question > .ant-radio-group > :nth-child(1) > .ant-radio > .ant-radio-input').click()
            cy.get(':nth-child(2) > .ant-form-item-control > .ant-form-item-control-input > .ant-form-item-control-input-content > .ant-col > .question > .ant-radio-group > :nth-child(2)').click()
            cy.get(':nth-child(3) > .ant-form-item-control > .ant-form-item-control-input > .ant-form-item-control-input-content > .ant-col > .question > .ant-radio-group > :nth-child(2)').click()
            cy.get(':nth-child(4) > .ant-form-item-control > .ant-form-item-control-input > .ant-form-item-control-input-content > .ant-col > .question > .ant-radio-group > :nth-child(2)').click()
            cy.get(':nth-child(5) > .ant-form-item-control > .ant-form-item-control-input > .ant-form-item-control-input-content > .ant-col > .question > .ant-radio-group > :nth-child(2)').click()
            cy.get('.ant-btn-primary').click()

                //Редактирование
            cy.get('.ant-input').click()
                .type(lastname)
            cy.contains('Часовик').click()
            cy.contains(name1).click()
            cy.get('[style="display: flex; gap: 12px; justify-content: flex-end;"] > :nth-child(1)').click()
            cy.get(':nth-child(9) > .ant-row > .ant-form-item-control > .ant-form-item-control-input > .ant-form-item-control-input-content > .ant-select > .ant-select-selector').click()
            cy.contains('Женщина').click()
            cy.get('.ant-btn-primary').click()
            cy.wait(3000)

                 //Проверка
            cy.contains('Женщина')

                //Архивировать
            // cy.get('.archive-btn').click()
            // cy.get('.ant-popover-buttons > .ant-btn-primary').click()

                //Проверка
            // cy.get('.ant-tabs-nav-list > :nth-child(7)').click()
            // cy.get('.ant-input').click()
            //   .type('LAP')
            // cy.get('[data-row-key="18a56275-2bf5-47f0-bd30-397c83e6375a"] > :nth-child(2)').click()
            // // cy.get(':nth-child(3) > .ant-col-6 > p').should('have.value', 'LAP')
            // cy.get('.ant-breadcrumb-link > a').click()
          })

          it('First stage', function() {
                //1 этап
            cy.get('.ant-card-body > :nth-child(1) > :nth-child(1) > :nth-child(1) > .ant-tabs-nav-wrap > .ant-tabs-nav-list > :nth-child(2)').click()
            cy.contains(position).click()
            cy.contains(name1).click()
            cy.get('[style="display: flex; gap: 12px; justify-content: flex-end;"] > :nth-child(5)').click()
            cy.get('#date').click()
              .type('21.07.2022{enter}')
            cy.get('#time').click()
              .type('18:00{enter}')
            cy.wait(1000)
            cy.get('#full_name').click()
              .type(name1)
            cy.get('#phoneNumber').click()
              .type(phonenum)
            cy.get('#location').click()
              .type(point)
            cy.contains(point).last().click()
            cy.get('.ant-switch-handle').click()
            cy.get('.save-edit > .ant-btn-primary').click()
            cy.wait(2000)

                //Проверка
            cy.get('.ant-input').click()
              .type(lastname)
            cy.contains(name1).click()
            cy.contains(phonenum)
          })

          it('Second Stage', function() {
            cy.get('.ant-card-body > :nth-child(1) > :nth-child(1) > :nth-child(1) > .ant-tabs-nav-wrap > .ant-tabs-nav-list > :nth-child(3)').click()
            cy.get('.ant-input').click()
              .type(lastname)
            cy.contains(name1).click()
            // cy.contains(phonenum)
            cy.get('.save-edit > :nth-child(5)').click()
            cy.wait(2000)
            cy.get('#date').click()
              .type('21.07.2022{enter}')
            cy.get('#time').click()
              .type('18:00{enter}')
            cy.wait(1000)
            cy.get('#full_name').click()
              .type('pul')
              cy.get('.ant-select-item-option-content').click()
            cy.get('.ant-input').click()
              .type(phonenum)
            cy.get(':nth-child(5) > .ant-form-item-control > .ant-form-item-control-input > .ant-form-item-control-input-content > .ant-select > .ant-select-selector').click()
              .type(point)
            cy.contains(point).last().click()
            cy.get('.ant-switch-handle').click()
            cy.get('.save-edit > .ant-btn-primary').click()
            cy.wait(5000)
          })

          it('Internship', function() {

                //Приглашение на стажировку
            cy.get('.ant-tabs-nav-list > :nth-child(4)').click()
            cy.get('.ant-input').click()
              .type(lastname)
            cy.contains(name1).click()
            cy.contains(phonenum)
            cy.get(':nth-child(17) > :nth-child(2) > .ant-select > .ant-select-selector').click()
            cy.contains('Смена 2')
            cy.get('.ant-switch-handle').click()
            cy.get('.save-edit > :nth-child(5)').click()

                //Выбор даты
            cy.get('.ant-picker-input > input').click()
            cy.get('[title="2022-07-19"]').click()
            cy.get('.ant-modal-footer > .ant-btn').click()
            cy.wait(5000)
          })

          it('Applying to job', function(){
            cy.get('.ant-tabs-nav-list > :nth-child(5)').click()
            cy.get('.ant-input').click()
            .type(lastname)
            cy.contains(name1).click()
            cy.get('.save-edit > :nth-child(5)').click()
            cy.wait(5000)
          })

          it('Becoming employee', function() {
            cy.get('.ant-tabs-nav-list > :nth-child(6)').click()
            cy.get('.ant-input').click()
            .type(lastname)
            cy.contains(name1).click()
            cy.contains(phonenum)
            cy.get('.save-edit > :nth-child(5)').click()

                //Документы
            cy.get('#jurface').click()
            cy.contains(legal).click()
            cy.get('#inn').click()
              .type(inn)
            cy.get('#inps').click()
              .type(randomFixedInteger(6))
            cy.get('input[type=file]').attachFile(passport)
            cy.get('input[type=file]').eq(1).attachFile(avatar)
            cy.get('input[type=file]').eq(2).attachFile(passport)
            cy.get('input[type=file]').eq(3).attachFile(avatar)
            cy.wait(5000)
            cy.get('.ant-btn-primary').click()
            cy.wait(5000)

                //Проверка
            cy.get('.anticon-menu-unfold > svg').click()
            cy.contains('Сотрудники').click()
            cy.get('[style="position: sticky; left: 70px;"] > .ant-table-filter-column > .ant-dropdown-trigger').click()
            cy.get('.ant-input').click()
              .type(lastname)
              .type('{enter}')
            cy.contains(name1).click()
            cy.contains(phonenum)
          })
}) 
