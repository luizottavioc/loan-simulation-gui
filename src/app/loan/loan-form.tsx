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
import LoadingUfs from '@/components/loan-form/loading-ufs'
import MsgPostLoanSuccess from '@/components/loan-form/msg-post-loan-success'
import MsgApiError from '@/components/loan-form/msg-api-error'
import MsgSubmitError from '@/components/loan-form/msg-submit-error'
import LargeButton from '@/components/buttons/large-button'

import { FormProvider, useForm } from 'react-hook-form'
import { calculateLoan } from '@/services/loan.service'
import { ServiceException } from '@/utils/service-exception'
import { useEffect, useState } from 'react'
import { fetchUFsAsOptions } from '@/services/uf.service'
import { UF } from '@/types/uf'
import { getTextOnlyNumbers } from '@/services/form.service'

export default function LoanForm({
  postLoanSuccess,
  setPostLoanSuccess,
  setLoanMade,
}: {
  postLoanSuccess: string | null
  setPostLoanSuccess: (message: string | null) => void
  setLoanMade: (loan: LoanMade) => void
}) {
  const [ufsInterest, setUfsInterest] = useState<UF[]>([])
  const [ufsListOptions, setUfsListOptions] = useState<SelectOption[]>([])
  const [loadingUfs, setLoadingUfs] = useState<boolean>(true)
  const [submitError, setSubmitError] = useState<string | null>(null)
  const [apiError, setApiError] = useState<string | null>(null)

  useEffect(() => {
    if (ufsListOptions.length > 0) return
    fetchUFsAsOptions(
      setUfsListOptions,
      setUfsInterest,
      setApiError,
      setLoadingUfs,
    )
  }, [ufsListOptions])

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
      setSubmitError(null)
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
      {loadingUfs && <LoadingUfs />}
      {postLoanSuccess && (
        <MsgPostLoanSuccess
          message={postLoanSuccess}
          setPostLoanSuccess={setPostLoanSuccess}
        />
      )}
      {apiError && <MsgApiError message={apiError} setApiError={setApiError} />}
      <FormProvider {...methods}>
        <form
          className={`${loadingUfs && 'pointer-events-none opacity-50'} ${'flex w-full flex-col items-center justify-center gap-2 rounded bg-zinc-50 p-4 py-8 shadow-md lg:p-6'}`}
          onSubmit={handleSubmit(onSubmit)}
        >
          {submitError && (
            <MsgSubmitError
              message={submitError}
              setSubmitError={setSubmitError}
            />
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
          <div className="mt-3 flex w-full flex-col items-center justify-center gap-2">
            <LargeButton name="submit" title="Simular" submit>
              SIMULAR
            </LargeButton>
          </div>
        </form>
      </FormProvider>
    </div>
  )
}
