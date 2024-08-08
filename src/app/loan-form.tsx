'use client'

import { SelectOption } from '@/types/form'
import { LoanMade } from '@/types/loan'
import * as yup from 'yup'
import { yupResolver } from '@hookform/resolvers/yup'

import PageSubTitle from '@/components/typography/page-subtitle'
import InputText from '@/components/form/input-text'
import InputCurrency from '@/components/form/input-currency'
import Select from '@/components/form/select'
import InputDate from '@/components/form/input-date'
import LargeButton from '@/components/buttons/large-button'
import { FormProvider, useForm } from 'react-hook-form'
import { calculateLoan } from '@/services/loan.service'
import { ServiceException } from '@/utils/service-exception'
import { useEffect, useState } from 'react'
import { fetchUFsAsOptions } from '@/services/uf.service'
import { UF } from '@/types/uf'
import { getTextOnlyNumbers } from '@/services/form.service'

export default function LoanForm({
  postLoanMessage,
  setPostLoanMessage,
  setLoanMade,
}: {
  postLoanMessage: string | null
  setPostLoanMessage: (message: string | null) => void
  setLoanMade: (loan: LoanMade) => void
}) {
  const [ufsInterest, setUfsInterest] = useState<UF[]>([])
  const [ufsListOptions, setUfsListOptions] = useState<SelectOption[]>([])
  const [submitError, setSubmitError] = useState<string | null>(null)

  useEffect(() => {
    fetchUFsAsOptions(setUfsListOptions, setUfsInterest)
  }, [])

  const loanFormSchema = yup.object().shape({
    cpf: yup
      .string()
      .min(14, 'CPF inválido.')
      .max(14, 'CPF inválido.')
      .required('O campo "CPF" é obrigatório.'),
    uf: yup
      .number()
      .typeError('O campo "UF" é obrigatório.')
      .required('O campo "UF" é obrigatório.')
      .positive()
      .integer(),
    dateBirth: yup
      .date()
      .typeError('O campo "Data de nascimento" deve possuir um valor válido')
      .required('O campo "Data de nascimento" é obrigatório.'),
    loanAmountValue: yup
      .string()
      .typeError('O campo "Valor do emprestimo" deve possuir um valor válido')
      .required('O campo "Valor do emprestimo" é obrigatório.'),
    loanInstallmentsValue: yup
      .string()
      .typeError('O campo "Valor das parcelas" deve possuir um valor válido')
      .required('O campo "Valor das parcelas" é obrigatório.'),
  })

  const methods = useForm<yup.InferType<typeof loanFormSchema>>({
    resolver: yupResolver(loanFormSchema),
  })

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = methods

  const onSubmit = async (data: yup.InferType<typeof loanFormSchema>) => {
    try {
      const dataWithTreatedMasks = {
        ...data,
        cpf: getTextOnlyNumbers(data.cpf),
        loanAmountValue: parseInt(getTextOnlyNumbers(data.loanAmountValue)),
        loanInstallmentsValue: parseInt(
          getTextOnlyNumbers(data.loanInstallmentsValue),
        ),
      }
      const loanMade = calculateLoan(dataWithTreatedMasks, ufsInterest)
      setLoanMade(loanMade)
    } catch (error) {
      resolveSubmitError(error)
    }
  }

  const resolveSubmitError = (error: unknown) => {
    if (!error) return

    error instanceof ServiceException
      ? setSubmitError(error.message)
      : setSubmitError('Erro inesperado ao simular emprestimo.')
  }

  return (
    <div className="flex w-full flex-col items-center justify-center gap-4 lg:min-w-[850px] lg:max-w-[50svw]">
      <PageSubTitle>Preencha o formulário abaixo para simular</PageSubTitle>
      {postLoanMessage && (
        <div className="relative w-full animate-show-fade-in rounded bg-green-500/10 p-2 px-6 text-center text-xs font-bold text-green-600">
          {postLoanMessage}
          <button
            className="absolute right-2 top-1/2 -translate-y-1/2"
            onClick={() => setPostLoanMessage(null)}
          >
            x
          </button>
        </div>
      )}
      <FormProvider {...methods}>
        <form
          className="flex w-full flex-col items-center justify-center gap-2 rounded bg-zinc-50 p-4 py-8 shadow-md lg:p-6"
          onSubmit={handleSubmit(onSubmit)}
        >
          {submitError && (
            <div className="relative w-full animate-show-fade-in rounded bg-red-500/10 p-2 px-6 text-center text-xs font-bold text-red-600">
              {submitError}
              <button
                className="absolute right-2 top-1/2 -translate-y-1/2"
                onClick={() => setSubmitError(null)}
              >
                x
              </button>
            </div>
          )}
          <InputText
            title="CPF"
            name="cpf"
            placeholder="CPF"
            maskCpf
            register={register('cpf')}
            error={errors.cpf?.message}
          />
          <Select
            name="uf"
            title="Estado"
            placeholder="UF"
            options={ufsListOptions}
            register={register('uf')}
            error={errors.uf?.message}
          />
          <InputDate
            name="dateBirth"
            title="Data de nascimento"
            placeholder="DATA DE NASCIMENTO"
            register={register('dateBirth')}
            error={errors.dateBirth?.message}
          />
          <InputCurrency
            name="loanAmountValue"
            title="Valor do empréstimo"
            placeholder="QUAL O VALOR DO EMPRÉSTIMO?"
            register={register('loanAmountValue')}
            error={errors.loanAmountValue?.message}
          />
          <InputCurrency
            name="loanInstallmentsValue"
            title="Valor das parcelas"
            placeholder="QUAL O VALOR DESEJA PAGAR POR MÊS?"
            register={register('loanInstallmentsValue')}
            error={errors.loanInstallmentsValue?.message}
          />
          <div className="mt-3 w-full">
            <LargeButton name="submit" title="Simular" submit>
              SIMULAR
            </LargeButton>
          </div>
        </form>
      </FormProvider>
    </div>
  )
}
