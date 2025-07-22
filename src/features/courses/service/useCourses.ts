import { useQuery } from "@tanstack/react-query";
import { api } from "../../../shared/lib/axios";
import { courses } from "../../keys";

export const useCourses = () => {
  const getCourses = useQuery({
    queryKey: [courses],
    queryFn: () => api.get("/courses").then((res) => res.data),
  });

  const getCourse = (id: string) =>
    useQuery({
      queryKey: [courses, id],
      queryFn: () => api.get(`/courses/${id}`).then((res) => res.data),
    });

  return { getCourses, getCourse };
};
