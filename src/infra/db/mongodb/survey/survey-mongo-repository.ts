import { SurveyModel } from '@/domain/models/survey'
import { AddSurveyModel } from '@/domain/usecases/add-survey'
import { AddSurveyRepository } from '@/data/protocols/db/survey/add-survey-repository'
import { LoadSurveysRepository } from '@/data/protocols/db/survey/load-surveys-repository'
import { MongoHelper } from '../helpers/mongo-helper'
import { LoadSurveyByIdRepository } from '@/data/usecases/load-survey-by-id/db-load-survey-by-id-protocols'

export class SurveyMongoRepository implements AddSurveyRepository, LoadSurveysRepository, LoadSurveyByIdRepository {
  async add (surveyData: AddSurveyModel): Promise<void> {
    const surverCollection = await MongoHelper.getCollection('surveys')
    await surverCollection.insertOne(surveyData)
  }

  async loadAll (): Promise<SurveyModel[]> {
    const surverCollection = await MongoHelper.getCollection('surveys')
    const surveys = await surverCollection.find().toArray()
    return MongoHelper.mapCollection(surveys)
  }

  async loadById (id: string): Promise<SurveyModel> {
    const surverCollection = await MongoHelper.getCollection('surveys')
    const survey = await surverCollection.findOne({ _id: id })
    return survey && MongoHelper.map(survey)
  }
}
