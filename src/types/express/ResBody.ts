/* based on JSend convention - https://github.com/omniti-labs/jsend?tab=readme-ov-file#readme */
interface Success<D = object> {
  status: 'success';
  data?: D | null;
}

interface Error {
  status: 'error';
  message: string;
  error?: object;
}

export type ResBody<D = object | null> = Success<D> | Error;
