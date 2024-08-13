import { restLesson } from "@/app/api";
import { BadRequestError } from "@/types/errors";
import { showErrorToast, showSuccessToast } from "@/util";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export default function useRestLessonMutation() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: restLesson,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['lessons'] })
      showSuccessToast("휴식 신청이 완료되었습니다.")
    },
    onError: (error) => {
      if (error instanceof BadRequestError) {
        showErrorToast(error.message)
      }
    }
  })
}
