export default class HttpClient {
  #url = '';

  constructor(url: string) {
    this.#url = url;
  }
  async get() {
    try {
      const res = await fetch(this.#url);

      if (res.ok) {
        const data = await res.json();
        return data;
      } else {
        throw new Error(`Failed to fetch data: ${res.status} - ${res.statusText}`);
      }
    } catch (err: any) {
      throw new Error(`Error fetching data: ${err.message}`);
    }
  }
}
