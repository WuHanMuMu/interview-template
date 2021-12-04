import { RequestContract } from '@ioc:Adonis/Core/Request'
import { ClientRecognizerContract } from '@ioc:Adonis/Addons/RequestThrottler'

export default class CustomClientRecognizer implements ClientRecognizerContract {
  private requestKeys: string[] = ['method', 'hostname', 'url', 'ip']
  public identifyClient(request: RequestContract): Promise<string> | string {
    return this.requestKeys.map((key) => request[key]()).join(':') + ':' + (request.userId || 0)
  }
}
