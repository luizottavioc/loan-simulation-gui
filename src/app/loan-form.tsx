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

  const onSubmit = (data: yup.InferType<typeof loanFormSchema>) => {
    try {
      const loan = calculateLoan(data)
      setLoan(loan)
    } catch (error) {
      console.error(error)
    }
  }

  return (
    <div className="flex w-full flex-col items-center justify-center gap-4 lg:min-w-[850px] lg:max-w-[50svw]">
      <PageSubTitle>Preencha o formulário abaixo para simular</PageSubTitle>
      <form
        className="flex w-full flex-col items-center justify-center gap-2 rounded bg-zinc-50 p-4 py-8 shadow-md lg:p-6 lg:pt-12"
        onSubmit={handleSubmit(onSubmit)}
      >
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
            fnClick={() => {
              console.log()
            }}
          >
            SIMULAR
          </LargeButton>
        </div>
      </form>
    </div>
  )
}
