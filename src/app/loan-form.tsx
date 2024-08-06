'use client'

import { useState } from 'react'
import { SelectOption } from '@/types/form'
import ufs from '@/data/uf.json'

import PageSubTitle from '@/components/typography/page-subtitle'
import InputText from '@/components/form/input-text'
import InputCurrency from '@/components/form/input-currency'
import Select from '@/components/form/select'
import InputDate from '@/components/form/input-date'
import LargeButton from '@/components/buttons/large-button'

const ufsList: SelectOption[] = ufs.map((uf) => ({
  label: `${uf.sigla} - ${uf.nome}`,
  value: uf.id,
}))

export default function LoanForm() {
  const [cpf, setCpf] = useState<string>('')
  const [uf, setUf] = useState<number>(0)
  const [dateBirth, setDateBirth] = useState<string>('')
  const [loanAmount, setLoanAmount] = useState<string>('')
  const [loanInstallments, setLoanInstallments] = useState<string>('')

  return (
    <div className="flex w-full flex-col items-center justify-center gap-4 lg:min-w-[850px] lg:max-w-[50svw]">
      <PageSubTitle>Preencha o formulário abaixo para simular</PageSubTitle>
      <form className="flex w-full flex-col items-center justify-center gap-2 rounded bg-zinc-50 p-4 py-8 shadow-md lg:p-6 lg:pt-12">
        <InputText
          name="CPF"
          title="CPF"
          placeholder="CPF"
          value={cpf}
          maskCpf
          fnChange={setCpf}
        />
        <Select
          name="uf"
          title="Estado"
          placeholder="UF"
          options={ufsList}
          value={uf}
          fnChange={(value: string) => setUf(Number(value))}
        />
        <InputDate
          name="date-birth"
          title="Data de nascimento"
          placeholder="DATA DE NASCIMENTO"
          value={dateBirth}
          fnChange={setDateBirth}
        />
        <InputCurrency
          name="loan-amount"
          title="Valor do empréstimo"
          placeholder="QUAL O VALOR DO EMPRÉSTIMO?"
          value={loanAmount}
          fnChange={setLoanAmount}
        />
        <InputCurrency
          name="loan-installments"
          title="Valor das parcelas"
          placeholder="QUAL O VALOR DESEJA PAGAR POR MÊS?"
          value={loanInstallments}
          fnChange={setLoanInstallments}
        />
        <div className="mt-3 w-full">
          <LargeButton
            name="submit"
            title="Simular"
            fnClick={() => {
              console.log({
                cpf,
                uf,
                dateBirth,
                loanAmount,
                loanInstallments,
              })
            }}
          >
            SIMULAR
          </LargeButton>
        </div>
      </form>
    </div>
  )
}
