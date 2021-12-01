import { DateTime } from 'luxon'
import { BaseModel, column } from '@ioc:Adonis/Lucid/Orm'

export default class Order extends BaseModel {
  @column({ isPrimary: true })
  public id: number

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime

  @column()
  public userId: number

  @column()
  public productId: number

  @column()
  public quantity: number

  @column()
  public price: number

  @column()
  public total: number

  @column()
  public status: number // 0初始化 10支付中 20 支付成功 30 支付失败 40 退款等

  @column()
  public orderNo: string
}
