export default class ApiService {
  #url = '';

  constructor(url: string) {
    this.#url = url;
  }
  private async handleResponse(res: Response) {
    if (res.ok) {
      const data = await res.json();
      return data;
    } else {
      throw new Error(
        `Failed to fetch data: ${res.status} - ${res.statusText}`
      );
    }
  }

  private async makeRequest<T>(reqMethod: string, data?: T): Promise<T> {
    try {
      const options: RequestInit = {
        method: reqMethod,
        headers: { 'Content-Type': 'application/json' },
        body: data ? JSON.stringify(data) : undefined,
      };

      console.log(options);

      const res = await fetch(this.#url, options);
      return this.handleResponse(res);
    } catch (err) {
      throw new Error(`Error in ${reqMethod} method: ${err}`);
    }
  }

  async get<T>(): Promise<T> {
  

    return this.makeRequest<T>('GET');
  }

  async add<T>(data: T) {

    return this.makeRequest<T>('POST', data);
  }

  async edit<T>(data: T) {
 
    return this.makeRequest<T>('PUT', data);
  }

  async delete<T>() {

    return this.makeRequest<T>('DELETE');
  }
}
