interface FetchingState<T> {
  state: any;
  isFetching: boolean;
  config: T;
}

export default FetchingState;
