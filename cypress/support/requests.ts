import { CreditDecisionResult } from '../../src/models/credit-decision-result.enum'

export const backendBaseUrl: string = 'http://localhost:8080';
export const validateCreditApplicationEndpoint: string = '/api/credit-application';
export const getAcceptsCreditOfferingEndpoint = (uuid: string) => `/api/credit-application/${uuid}/accept`;

export const creditApplicationRequestAlias: string = 'credit-application-request';
export const creditApplicationRequestAcceptOfferingAlias: string = 'credit-application-request-accept';

/**
 * used to perform the intercept on the form submission to mock the result returned
 * @param decisionResult
 */
export const interceptCreditApplicationRequest = (
  decisionResult: CreditDecisionResult,
) => {
  let statusCode: number;

  switch (decisionResult) {
    case CreditDecisionResult.APPROVED:
      statusCode = 200;
      break;
    case CreditDecisionResult.DENIED:
    case CreditDecisionResult.CONDITIONAL_APPROVED:
    case CreditDecisionResult.REVISED_TERMS:
      statusCode = 400;
      break
    default:
      statusCode = 200;
  }

  cy
    .intercept(
      {
        method: 'POST',
        url: `${backendBaseUrl}${validateCreditApplicationEndpoint}`,
      },
      {
        statusCode: statusCode,
        body: {
          decision: decisionResult,
        },
      }
    )
    .as(creditApplicationRequestAlias);

}

/**
 * accept the credit offering with uuid and receive a 204 status code
 * @param uuid
 */
export const interceptAcceptCreditOffering = (
  uuid: string
) => {
  cy
    .intercept(
      {
        method: 'POST',
        url: `${backendBaseUrl}${getAcceptsCreditOfferingEndpoint(uuid)}`,
      },
      {
        statusCode: 204,
      }
    )
    .as(creditApplicationRequestAcceptOfferingAlias);
}
