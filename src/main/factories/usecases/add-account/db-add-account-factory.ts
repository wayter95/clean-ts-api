import { DbAddAccount } from '../../../../data/usecases/add-account/db-add-account'
import { AccountMongoRepository } from '../../../../infra/db/mongodb/account/account-mongo-repository'
import { BcrypAdapter } from '../../../../infra/criptography/bcrypt-adapter/bcrypt-adapter'
import { AddAccount } from '../../../../domain/usecases/add-account'

export const makeDbAddAccount = (): AddAccount => {
  const salt = 12
  const bcrypAdapter = new BcrypAdapter(salt)
  const cccountMongoRepository = new AccountMongoRepository()
  return new DbAddAccount(bcrypAdapter,cccountMongoRepository)
}
