import { AxiosInstance } from 'axios';

class ApiEndpoint {
  public http: AxiosInstance;

  constructor(private readonly axios: AxiosInstance) {
    this.http = axios;
  }
}

export default ApiEndpoint;
