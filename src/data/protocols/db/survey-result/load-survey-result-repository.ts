import { SurveyResultModel } from '@/domain/models/survey-result'

export interface LoadSurveyResultRepository {
  loadBySurveyId (surveyId: string, acountId: string): Promise<SurveyResultModel>
}
