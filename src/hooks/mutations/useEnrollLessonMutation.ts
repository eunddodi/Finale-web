import { enrollLesson } from "@/app/api";
import { useMutation } from "@tanstack/react-query";

export default function useEnrollLessonMutation() {
  return useMutation({
    mutationFn: enrollLesson,
  })
}
