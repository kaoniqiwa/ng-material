export interface ConvertSource {
  [key: string]: any;
}

export type sourceType = ConvertSource | ConvertSource[];

/**
 *  Generic Type Parameter List <T1,T2,T3,...>
 */

export abstract class CommonConverter<M> {
  abstract convert(source: sourceType, ...res: any[]): M;

  iterateToModel<T extends M>(data: ConvertSource[]) {
    let res: T[] = [];
    for (let i = 0; i < data.length; i++) {
      let item = data[i];
      const model = this.convert(item) as T;
      res.push(model);
    }
    return res;
  }
}

export abstract class PromiseConverter<T> {
  abstract convert(source: sourceType, ...res: any[]): Promise<T>;

  async iterateToModel(data: sourceType[]) {
    let res: T[] = [];
    for (let i = 0; i < data.length; i++) {
      let item = data[i];
      const model = await this.convert(item);
      res.push(model);
    }
    return res;
  }
}

// Generic Constraints in term of another type parameter
function getProperty<T, M extends keyof T>(obj: T, key: M) {
  return obj[key];
}
