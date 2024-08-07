'use client'

import { SelectOption } from '@/types/form'
import { Loan } from '@/types/loan'
import * as yup from 'yup'
import { yupResolver } from '@hookform/resolvers/yup'
import ufs from '@/data/uf.json'

import PageSubTitle from '@/components/typography/page-subtitle'
import InputText from '@/components/form/input-text'
import InputCurrency from '@/components/form/input-currency'
import Select from '@/components/form/select'
import InputDate from '@/components/form/input-date'
import LargeButton from '@/components/buttons/large-button'
import { useForm } from 'react-hook-form'
import { calculateLoan } from '@/services/loan.service'
import { ServiceException } from '@/utils/service-exception'
import { useState } from 'react'

const ufsList: SelectOption[] = ufs.map((uf) => ({
  label: `${uf.sigla} - ${uf.nome}`,
  value: uf.id,
}))

export default function LoanForm({
  setLoan,
}: {
  setLoan: (loan: Loan) => void
}) {
  const loanFormSchema = yup.object().shape({
    cpf: yup.string().required('O campo "CPF" é obrigatório.'),
    uf: yup
      .number()
      .typeError('O campo "UF" é obrigatório.')
      .required('O campo "UF" é obrigatório.')
      .positive()
      .integer(),
    dateBirth: yup.string().required('A data de nascimento é obrigatória.'),
    loanAmountValue: yup
      .number()
      .typeError('O campo "Valor do emprestimo" deve possuir um valor válido')
      .required('O campo "Valor do emprestimo" é obrigatório.')
      .integer()
      .positive(
        'O campo "Valor do emprestimo" deve possuir um valor positivo.',
      ),
    loanInstallmentsValue: yup
      .number()
      .typeError('O campo "Valor das parcelas" deve possuir um valor válido')
      .required('O campo "Valor das parcelas" é obrigatório.')
      .integer()
      .positive('O campo "Valor das parcelas" deve possuir um valor positivo.'),
  })

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<yup.InferType<typeof loanFormSchema>>({
    resolver: yupResolver(loanFormSchema),
  })

  const [loadingSubmit, setLoadingSubmit] = useState(false)
  const [submitError, setSubmitError] = useState<string | null>(null)

  const onSubmit = async (data: yup.InferType<typeof loanFormSchema>) => {
    try {
      setLoadingSubmit(true)

      const loanMade = await calculateLoan(data)
      setLoan(loanMade.loan)

      setLoadingSubmit(false)
    } catch (error) {
      resolveSubmitError(error)
    }
  }

  const resolveSubmitError = (error: unknown) => {
    setLoadingSubmit(false)

    if (!error) return

    error instanceof ServiceException
      ? setSubmitError(error.message)
      : setSubmitError('Erro inesperado ao simular emprestimo.')
  }

  return (
    <div className="flex w-full flex-col items-center justify-center gap-4 lg:min-w-[850px] lg:max-w-[50svw]">
      <PageSubTitle>Preencha o formulário abaixo para simular</PageSubTitle>
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
          register={register('cpf')}
          error={errors.cpf?.message}
        />
        <Select
          name="uf"
          title="Estado"
          placeholder="UF"
          options={ufsList}
          register={register('uf')}
          error={errors.uf?.message}
        />
        <InputDate
          name="date-birth"
          title="Data de nascimento"
          placeholder="DATA DE NASCIMENTO"
          register={register('dateBirth')}
          error={errors.dateBirth?.message}
        />
        <InputCurrency
          name="loan-amount"
          title="Valor do empréstimo"
          placeholder="QUAL O VALOR DO EMPRÉSTIMO?"
          register={register('loanAmountValue')}
          error={errors.loanAmountValue?.message}
        />
        <InputCurrency
          name="loan-installments"
          title="Valor das parcelas"
          placeholder="QUAL O VALOR DESEJA PAGAR POR MÊS?"
          register={register('loanInstallmentsValue')}
          error={errors.loanInstallmentsValue?.message}
        />
        <div className="mt-3 w-full">
          <LargeButton
            name="submit"
            title="Simular"
            submit
            disabled={loadingSubmit}
          >
            SIMULAR
          </LargeButton>
        </div>
      </form>
    </div>
  )
}
