/* based on JSend convention - https://github.com/omniti-labs/jsend?tab=readme-ov-file#readme */
type Success<D = object> = {
  status: 'success';
  data?: D | null;
};
type Error = {
  status: 'error';
  message: string;
  error?: object;
};

export type ResBody<D = object | null> = Success<D> | Error;
