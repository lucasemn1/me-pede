'use strict'

/*
|--------------------------------------------------------------------------
| Factory
|--------------------------------------------------------------------------
|
| Factories are used to define blueprints for database tables or Lucid
| models. Later you can use these blueprints to seed your database
| with dummy data.
|
*/

/** @type {import('@adonisjs/lucid/src/Factory')} */
const Factory = use('Factory')

Factory.blueprint('App/Models/User', (faker) => {
  /**
   * @param {String} date
   * @returns {Array}
   */
  function formateDate(date) {
    const fields = date.split('/')
    fields.reverse()

    if(fields[1]<10) {
      fields[1] = `0${fields[1]}`
    }
    if(fields[2]<10) {
      fields[2] = `0${fields[2]}`
    }

    return `${fields[0]}/${fields[2]}/${fields[1]}`
  }

  return {
    name: faker.username(),
    email: faker.email(),
    picture: 'default.jpg',
    password: '123',
    phone: faker.phone(),
    dateOfBirth: formateDate(faker.birthday({string:true})),
    level: 1,
  }
})

Factory.blueprint('App/Models/Address', (faker) => {
  return {
    number: faker.integer({min: 0, max: 999}),
    complement: 'casa',
    neighborhood: faker.street(),
    city: faker.city(),
    uf: faker.state(),
    country: faker.country(),
    postcode: faker.postcode(),
    street: faker.street()
  }
})

Factory.blueprint('App/Models/Market', async (faker, i, data) => {
  /**
   * @param {Number} cnpj
   */
  function formatCpnj(cnpj) {
    let cnpjStr = cnpj.toString()

    if( cnpjStr.length < 13 ){
      let complement = ''
      for(let i = 0; i<13 - cnpjStr.length; i++){
        complement = `1${complement}`
      }
      cnpjStr = `${complement}${cnpjStr}`
    }

    return Number.parseInt(cnpjStr)
  }

  return {
    cnpj: data.cpf ? data.cpf : formatCpnj(faker.integer({ min: 0, max: 999999 })),
    name: data.name ? data.name : faker.name(),
    minValue: data.minValue ? data.minValue : faker.floating({max:999, min:1, fixed: 2}),
    phone: data.phone ? data.phone : faker.phone(),
    userId: data.userId,
    picture: data.picture ? data.picture : 'default.jpg',
  }
})

Factory.blueprint('App/Models/Category', async (faker) => {
  return {
    category: faker.name(),
  }
})

Factory.blueprint('App/Models/Product', async (faker, i, data) => {
  return {
    title: faker.name(),
    price: faker.floating({ min: 0, max: 9999, fixed: 2 }),
    picture: 'default.jpg',
    stock: faker.integer({ min: 0, max: 1000 }),
    marketId: data.marketId ? data.marketId: 1
  }
})
