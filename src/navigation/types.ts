export type RootStackParamList = {
  Home: undefined;
  Login: undefined;
  Courses: undefined;
  CourseDetail: { courseId: string };
  LessonDetail: { lessonId: string; courseId?: string };
};
