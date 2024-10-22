import axios, { type AxiosResponse } from 'axios'
import type { CreditDecision } from '@/models/credit-decision.type'
import type { CreditApplicationRequest } from '@/models/credit-application-request.type'

const backendBaseUrl = window.VUE_CONFIG?.backendBaseUrl ?? '';

export default {
  submitCreditApplication(
    creditApplication: CreditApplicationRequest,
  ): AxiosResponse<CreditDecision> {
    return axios
      .post<CreditDecision>(
        `${backendBaseUrl}/api/credit-application`,
        creditApplication,
        {
          headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
          },
          responseType: 'json',
          timeout: 15_000,
        },
      )
  },
  // TODO - currently we do not have a uuid available
  acceptCreditApplication(
    uuid: string
  ) {
    return axios
      .post<unknown>(
        `${backendBaseUrl}/api/credit-application/${uuid}/accept`
      )
  }
}
