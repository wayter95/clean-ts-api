import { AccountModel } from '../../../domain/models/account'
import { AddAccountModel } from '../../../domain/usecases/add-account'

export interface AddAccounRepository {
  add (accountData: AddAccountModel): Promise<AccountModel>
}
