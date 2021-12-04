import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class Orders extends BaseSchema {
  protected tableName = 'orders'

  public async up () {
    this.schema.alterTable(this.tableName, (table) => {
      // table.increments('id')
      // table.timestamps(true)
      table.string('orderNo')
    })
  }

  public async down () {
    this.schema.dropTable(this.tableName)
  }
}
