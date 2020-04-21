// import { User } from '@models/user.model';

const optionals = <T>(query: any): Partial<T> => Object
  .entries(query)
  .reduce((acc, [key, value]) => (
    (value === undefined) ? acc : { ...acc, [key]: value }
  ), {});
// export const AddOption = (common: any, options: any[]): any[] => (
//   options.map(option => ({
//     ...optionals(common),
//     ...optionals(option),
//   }))
// );

export const isStringEnum = (Enum: any, value: string) => (
  Object.values(Enum).includes(value)
);

export const optionalEnum = <T>(Enum: any, value: string): T => (
  isStringEnum(Enum, value) ? Enum[value] : undefined
);

const findByString = (keys: string|string[], value: string) => {
  const findKeys = Array.isArray(keys) ? keys : [keys];
  if (!(findKeys && value)) return {};
  const resultQueries = findKeys.map(key => {
    const regexString = value.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
    return {
      [key]: { $regex: `.*${regexString}.*` },
    };
  });
  // console.log('queries', resultQueries);
  // return resultQueries;
  return { $or: resultQueries };
};

// findByString({ title, content }, [
//   ['title'],
//   ['content'],
//   ['title', 'content'],
// ]);

const useQuery = {
  optionals,
  findByString,
};

export {
  useQuery,
};

export const buildQuery = () => {

};
