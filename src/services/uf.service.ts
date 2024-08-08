import { UF } from '@/types/uf'
import { SelectOption } from '@/types/form'
import http from './http.service'
import { ServiceException } from '@/utils/service-exception'

export async function requestUFsInfo(): Promise<UF[]> {
  const endpointAllUFs = '/uf'
  const response: UF[] | null = await http
    .get(endpointAllUFs)
    .then((response) => {
      const { data } = response
      if (!data || !Array.isArray(data)) {
        throw new ServiceException('Erro ao buscar UFs disponíveis.')
      }

      return data as UF[]
    })
    .catch(() => null)

  if (response === null) {
    console.log('Erro ao buscar UFs disponíveis. Tente novamente mais tarde.')
    throw new ServiceException(
      'Erro ao buscar UFs disponíveis. Tente novamente mais tarde.',
    )
  }

  return response
}

export async function fetchUFsAsOptions(
  setUfsListOptions: (ufs: SelectOption[]) => void,
  setUfsInterest: (ufs: UF[]) => void,
  setApiError: (error: string | null) => void,
) {
  try {
    const ufs = await requestUFsInfo()
    const ufsAsOptions = ufs.map((uf) => ({ label: uf.name, value: uf.id }))

    setUfsListOptions(ufsAsOptions)
    setUfsInterest(ufs)
  } catch (error) {
    setApiError('Serviço indisponível. Tente novamente mais tarde!')
  }
}
