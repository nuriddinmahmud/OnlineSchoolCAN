import { useQuery } from "@tanstack/react-query";
import { api } from "../../../shared/lib/axios";
import { lessons } from "../../keys";

export const useLessons = () => {
  const getLessons = (id: string) =>
    useQuery({
      queryKey: [lessons, id],
      queryFn: () => api.get(`/courses/${id}/lessons`).then((res) => res.data),
    });

  const getLesson = (lessonId: string, courseId?: string) =>
    useQuery({
      queryKey: [lessons, lessonId],
      queryFn: async () => {
        try {
          const endpoints = [
            `/lessons/${lessonId}`,
            `/courses/${courseId}/lessons/${lessonId}`,
            `/lessons/${lessonId}?course_id=${courseId}`,
          ];

          for (const endpoint of endpoints) {
            try {
              const response = await api.get(endpoint);
              return response.data;
            } catch (error) {
              console.log(`Failed endpoint ${endpoint}:`, error);
            }
          }
          throw new Error("All endpoints failed");
        } catch (error) {
          console.error("getLesson error:", error);
          throw error;
        }
      },
      enabled: !!lessonId,
    });

  return { getLessons, getLesson };
};
