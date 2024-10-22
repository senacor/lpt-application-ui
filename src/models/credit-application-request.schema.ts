import Joi from 'joi';
import type { CreditApplicationRequest } from '@/models/credit-application-request.type'
import { Occupations } from '@/models/occupations.enum'

export const creditApplicationRequestSchema = Joi.object<CreditApplicationRequest, false>({
  creditAmount: Joi
    .number()
    .positive()
    .required()
    .min(5_000)
    .max(100_000)
    .messages({}),
  firstName: Joi
    .string()
    .required()
    .min(3)
    .messages({
      'string.empty': 'Das Feld "Vorname" darf nicht leer sein',
    }),
  lastName: Joi
    .string()
    .required()
    .min(3)
    .messages({
      'string.empty': 'Das Feld "Nachname" darf nicht leer sein',
    }),
  zipCode: Joi
    .string()
    .required()
    .min(3)
    .messages({
      'string.empty': 'Das Feld "Postleitzahl" darf nicht leer sein',
    }),
  occupation: Joi
    .string()
    .valid(
      Occupations.EMPLOYED,
      Occupations.SELF_EMPLOYED,
      Occupations.BANKING,
      Occupations.INFORMATION_TECHNOLOGY,
    )
    .messages({
      'any.only': 'Bitte wählen Sie eine gültige Beschäftigung aus',
      'string.empty': 'Das Feld "Beschäftigung" darf nicht leer sein',
    }),
  monthlyNetIncome: Joi
    .number()
    .positive()
    .required()
    .min(500)
    .max(20_000)
    .messages({}),
  monthlyExpenses: Joi
    .number()
    .positive()
    .required()
    .min(500)
    .max(20_000)
    .messages({}),
});
