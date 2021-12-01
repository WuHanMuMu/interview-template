import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class Orders extends BaseSchema {
  protected tableName = 'orders'

  public async up() {
    this.schema.alterTable(this.tableName, (table) => {
      // table.increments('id')
      // table.timestamps(true)
      table.integer('userId').notNullable()
      table.integer('productId').notNullable()
      table.integer('quantity').notNullable()
      table.integer('status').notNullable()
      table.integer('price').notNullable()
    })
  }

  public async down() {
    this.schema.dropTable(this.tableName)
  }
}
