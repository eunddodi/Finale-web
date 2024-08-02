import { restLesson } from "@/app/api";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export default function useRestLessonMutation() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: restLesson,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['lessons'] })
    }
  })
}
