import { useToast } from "../components/ui/toast/use-toast";
import { DefaultOptions, MutationFunction, QueryClient, useMutation, UseMutationOptions } from "react-query";

const queryConfig: DefaultOptions = {
    queries: {
        cacheTime: 5 * 1000,
        useErrorBoundary: true,
        refetchOnWindowFocus: false,
        retry: false
    }
}

export const queryClient = new QueryClient({ defaultOptions: queryConfig })

export interface UseMutationWithNotificationOptions<TData, TError, TVariables, TContext> extends UseMutationOptions<TData, TError, TVariables, TContext> {
    shouldShowToastError?: boolean;
}

function useMutationWithNotification<
  TData = unknown,
  TError = unknown,
  TVariables = void,
  TContext = unknown,
>(
  mutationFn: MutationFunction<TData, TVariables>,
  config?: UseMutationWithNotificationOptions<
    TData,
    TError,
    TVariables,
    TContext
  >,
) {
  const { toast } = useToast();
  const { shouldShowToastError = true, ...options } = config || {};

  return useMutation(mutationFn, {
    onError: (error: any) => {
      // Update the type of the 'error' parameter
      if (shouldShowToastError) {
        toast({
          title: error?.message,
          variant: 'destructive',
        });
      }
    },
    ...options,
  });
}

export { useMutationWithNotification as useMutation };