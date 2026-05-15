import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import deleteCabin from "../../services/apiCabins";
export function useDeleteCabin() {
  const queryClient = useQueryClient();
  const { isLoading: isDeleting, mutate: deleteCabinMutation } = useMutation({
    mutationFn: deleteCabin,
    //trigger a refetch of the query after the mutation is successful
    onSuccess: () => {
      toast.success("Cabin Deleted Successfully");
      queryClient.invalidateQueries({
        queryKey: ["cabins"],
      });
    },
    // onError:(err)=>alert(err.message)
    onError: (err) => toast.error(err.message),
  });
  return { isDeleting, deleteCabinMutation };
}
