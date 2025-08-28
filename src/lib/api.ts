import { API_URL } from '@/config/setting'
import AxiosService from './axios'

let instance: APIService | null = null

class APIService extends AxiosService {
  constructor() {
    super(API_URL)
  }

  static getInstance() {
    if (instance) {
      return instance
    }

    instance = new APIService()
    return instance
  }
}

const API = APIService.getInstance()
export default API
