import {AxiosError} from 'axios';
import {ErrorResponse} from '../../libraries/Structs/ControllerStructs';
import {QueryKey, useQuery} from '@tanstack/react-query';
import {UseQueryOptions, UseQueryResult} from '@tanstack/react-query/src/types';
import {useErrorHandler} from '../Context/Contexts/ErrorHandlerContext';

/**
 * Clone of useQuery but dedicated for queries that can be performed without the user needing
 * to be logged in. Also does our error processing.
 * @param options
 */
export function useOpenQuery<
  TQueryFnData = unknown,
  TError extends Error = AxiosError<ErrorResponse>,
  TData = TQueryFnData,
  TQueryKey extends QueryKey = QueryKey,
>(
  options: Omit<UseQueryOptions<TQueryFnData, TError, TData, TQueryKey>, 'initialData'> & {
    initialData?: () => undefined;
  },
): UseQueryResult<TData, TError> {
  const {setErrorMessage} = useErrorHandler();
  return useQuery<TQueryFnData, TError, TData, TQueryKey>({
    onError: error => {
      setErrorMessage(error);
    },
    ...options,
  });
}
