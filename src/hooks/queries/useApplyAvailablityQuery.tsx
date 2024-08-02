import { checkApplyAvailability } from "@/app/api";
import { useSuspenseQuery } from "@tanstack/react-query";

export default function useApplyAvailablityQuery() {
  return useSuspenseQuery({
    queryKey: ['schedule'],
    queryFn: () => checkApplyAvailability()
  })
}
