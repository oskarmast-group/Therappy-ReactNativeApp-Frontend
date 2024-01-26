interface FetchingState<T> {
  isFetching: boolean;
  config: T;
}

export default FetchingState;
