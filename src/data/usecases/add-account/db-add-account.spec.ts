import { AddAccounRepository } from '../../protocols/db/add-account-repository'
import { DbAddAccount } from './db-add-account'
import { Encrypter, AddAccountModel, AccountModel } from './db-add-account-protocols'

const makeEncrypter = (): Encrypter => {
  class EncrypterStub implements Encrypter {
    async encrypt (value: string): Promise<string> {
      return new Promise(resolve => resolve('hashed_password'))
    }
  }
  return new EncrypterStub()
}

const makeFakeAccounData = (): AddAccountModel => ({
  name: 'valid_name',
  email: 'valid_email',
  password: 'valid_password'
})

const makeFakeAccount = (): AccountModel => ({
  id: 'valid_id',
  name: 'valid_name',
  email: 'valid_email',
  password: 'hashed_password'
})

const makeAddAccountRepository = (): AddAccounRepository => {
  class AddAccounRepositoryStub implements AddAccounRepository {
    async add (accountData: AddAccountModel): Promise<AccountModel> {
      return new Promise(resolve => resolve(makeFakeAccount()))
    }
  }
  return new AddAccounRepositoryStub()
}

interface SutTypes {
  sut: DbAddAccount
  encrypterStub: Encrypter
  addAccountRepositoryStub: AddAccounRepository
}

const makeSut = (): SutTypes => {
  const encrypterStub = makeEncrypter()
  const addAccountRepositoryStub = makeAddAccountRepository()
  const sut = new DbAddAccount(encrypterStub, addAccountRepositoryStub)
  return {
    sut,
    encrypterStub,
    addAccountRepositoryStub
  }
}

describe('DbAddAccount Usecase', () => {
  test('Shoul call Encrypter with correct password', async () => {
    const { encrypterStub, sut } = makeSut()
    const encryptSpy = jest.spyOn(encrypterStub, 'encrypt')
    await sut.add(makeFakeAccounData())
    expect(encryptSpy).toHaveBeenCalledWith('valid_password')
  })

  test('Should throws if Encrypter throws', async () => {
    const { encrypterStub, sut } = makeSut()
    jest.spyOn(encrypterStub, 'encrypt').mockReturnValueOnce(new Promise((resolve, reject) => reject(new Error())))
    const promise = sut.add(makeFakeAccounData())
    await expect(promise).rejects.toThrow()
  })

  test('Shoul call AddAccountRepository with correct values', async () => {
    const { sut, addAccountRepositoryStub } = makeSut()
    const addSpy = jest.spyOn(addAccountRepositoryStub, 'add')
    await sut.add(makeFakeAccounData())
    expect(addSpy).toHaveBeenCalledWith({
      name: 'valid_name',
      email: 'valid_email',
      password: 'hashed_password'
    })
  })

  test('Should throws if AddAccountRepository throws', async () => {
    const { addAccountRepositoryStub, sut } = makeSut()
    jest.spyOn(addAccountRepositoryStub, 'add').mockReturnValueOnce(new Promise((resolve, reject) => reject(new Error())))
    const promise = sut.add(makeFakeAccounData())
    await expect(promise).rejects.toThrow()
  })

  test('Shoul return an account on success', async () => {
    const { sut } = makeSut()
    const account = await sut.add(makeFakeAccounData())
    expect(account).toEqual(makeFakeAccount())
  })
})
