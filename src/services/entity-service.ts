import { Course } from '../models/Course.js';
import { convertForm } from '../utils/helpers.js';
import ApiService from './api-service.js';

/**
 * Class for entities with reusable methods.
 */
class EntityService<T> {
  private url: string;

  constructor(url: string) {
    this.url = url;
  }

  getList = async (): Promise<T[]> => {
    const http = new ApiService(`${this.url}/`);
    const entities: T[] = await http.get<T[]>();
    return entities;
  };

  /**
   * Gets details
   * @param id
   * @returns details of entity
   */
  getEntity = async (id: number): Promise<T> => {
    const http = new ApiService(`${this.url}/${id}`);
    const entity: T = await http.get<T>();
    console.log(entity);
    return entity;
  };

  addEntity = async (entity: T) => {
    const http = new ApiService(`${this.url}/`);
    await http.add<T>(entity);
  };

  deleteEntity = async (id: number) => {
    const http = new ApiService(`${this.url}/${id}`);
    await http.delete();
  };

  updateEntity = async (id: number, updatedEntity: T) => {
    const http = new ApiService(`${this.url}/${id}`);
    await http.edit(updatedEntity);
  };
}

export default EntityService;
