import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class UserLogs extends BaseSchema {
  protected tableName = 'user_logs'

  public async up () {
    this.schema.alterTable(this.tableName, (table) => {
      table.string('action', 100).nullable()
      table.string('description', 255).nullable()
      table.string('ip', 100).nullable()
      table.string('userAgent', 255).nullable()
      table.string('userId', 100).nullable()
      table.string('params', 1024).nullable()
    })
  }

  public async down () {
    this.schema.dropTable(this.tableName)
  }
}
