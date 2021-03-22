import { AccountModel } from '@/domain/models/account'
import { AddAccountModel } from '@/domain/usecases/account/add-account'

export interface AddAccounRepository {
  add (accountData: AddAccountModel): Promise<AccountModel>
}
