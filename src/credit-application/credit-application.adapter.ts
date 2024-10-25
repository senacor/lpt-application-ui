import axios, { type AxiosResponse } from 'axios'
import type { CreditDecision } from '@/credit-application/models/credit-decision.type'
import type { CreditApplicationRequest } from '@/credit-application/models/credit-application-request.type'

export class CreditApplicationAdapter {
  constructor(private _window = window) {}

  submitCreditApplication = (
    creditApplication: CreditApplicationRequest,
  ): Promise<AxiosResponse<CreditDecision>> =>
    axios.post<CreditDecision>(
      `${this.creditApplicationBaseUrl()}/api/credit-applications`,
      creditApplication,
      {
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
        },
        responseType: 'json',
        timeout: 15_000,
      },
    )

  acceptCreditApplication = (uuid: string): Promise<boolean> =>
    axios
      .post(
        `${this.creditApplicationBaseUrl}/api/credit-applications/${uuid}/accept`,
      )
      .then(
        (response: AxiosResponse) =>
          response.status >= 200 && response.status < 300,
      )

  private creditApplicationBaseUrl = () =>
    this._window.baseUrls.creditApplication
}
