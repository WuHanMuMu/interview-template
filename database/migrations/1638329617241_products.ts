import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class Products extends BaseSchema {
  protected tableName = 'products'

  public async up () {
    this.schema.alterTable(this.tableName, (table) => {
      table.string('name').notNullable()
      table.string('description').notNullable()
      table.integer('price').notNullable()
      table.integer('stock').notNullable()
    })
  }

  public async down () {
    this.schema.dropTable(this.tableName)
  }
}
