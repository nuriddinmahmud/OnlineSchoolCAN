import { useQuery } from "@tanstack/react-query";
import { api } from "../../../shared/lib/axios";

export const useCourses = () => {
  const courses = "courses";

  const getCourses = useQuery({
    queryKey: [courses],
    queryFn: () => api.get("/courses").then((res) => res.data),
  });

  const getCourse = (id: string) =>
    useQuery({
      queryKey: [courses],
      queryFn: () => api.get(`/courses/${id}`).then((res) => res.data),
    });

  return { getCourses, getCourse };
};
