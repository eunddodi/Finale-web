import { enrollLesson } from "@/app/api";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export default function useEnrollLessonMutation() {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: enrollLesson,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['lessons', 'my'] })
    }
  })
}
