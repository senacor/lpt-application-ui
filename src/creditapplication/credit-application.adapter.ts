import axios, { type AxiosResponse } from 'axios'
import type { CreditDecision } from '@/creditapplication/models/credit-decision.type'
import type { CreditApplicationRequest } from '@/creditapplication/models/credit-application-request.type'

const backendBaseUrl = window.VUE_CONFIG?.backendBaseUrl ?? ''

export default {
  submitCreditApplication(
    creditApplication: CreditApplicationRequest,
  ): Promise<AxiosResponse<CreditDecision>> {
    return axios.post<CreditDecision>(
      `${backendBaseUrl}/api/credit-applications`,
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
  },

  acceptCreditApplication(uuid: string): Promise<AxiosResponse> {
    return axios.post(
      `${backendBaseUrl}/api/credit-applications/${uuid}/accept`,
    )
  },
}
