import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  StyleSheet,
  Alert,
  ActivityIndicator,
} from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { Video, ResizeMode } from 'expo-av';
import { Ionicons } from '@expo/vector-icons';
import { AppDispatch, RootState } from '../store';
import {
  fetchLessonDetails,
  markLessonComplete,
  fetchLessonQuestions,
} from '../store/slices/lessonsSlice';
import AssessmentModal from '../components/AssessmentModal';

interface LessonContentScreenProps {
  navigation: any;
  route: {
    params: {
      lessonId: number;
    };
  };
}

const LessonContentScreen: React.FC<LessonContentScreenProps> = ({
  navigation,
  route,
}) => {
  const { lessonId } = route.params;
  const dispatch = useDispatch<AppDispatch>();
  const { currentLesson, isLoading } = useSelector((state: RootState) => state.lessons);
  const [showAssessment, setShowAssessment] = useState(false);
  const [videoStatus, setVideoStatus] = useState({});

  useEffect(() => {
    dispatch(fetchLessonDetails(lessonId));
  }, [dispatch, lessonId]);

  const handleCompleteLesson = async () => {
    if (currentLesson?.hasAssessment) {
      try {
        await dispatch(fetchLessonQuestions(lessonId)).unwrap();
        setShowAssessment(true);
      } catch (error) {
        Alert.alert('Error', 'Failed to load assessment questions.');
      }
    } else {
      completeLesson();
    }
  };

  const completeLesson = async () => {
    try {
      await dispatch(markLessonComplete(lessonId)).unwrap();
      Alert.alert('Lesson Completed', 'Great job! You have completed this lesson.', [
        { text: 'OK', onPress: () => navigation.goBack() },
      ]);
    } catch (error) {
      Alert.alert('Error', 'Failed to mark lesson as complete.');
    }
  };

  const handleAssessmentComplete = () => {
    setShowAssessment(false);
    completeLesson();
  };

  if (isLoading || !currentLesson) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#007AFF" />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <ScrollView style={styles.content}>
        <Text style={styles.lessonTitle}>{currentLesson.title}</Text>
        
        {currentLesson.videoUrl && (
          <View style={styles.videoContainer}>
            <Video
              source={{ uri: currentLesson.videoUrl }}
              style={styles.video}
              useNativeControls
              resizeMode={ResizeMode.CONTAIN}
              isLooping={false}
              onPlaybackStatusUpdate={(status) => setVideoStatus(status)}
            />
          </View>
        )}

        {currentLesson.content && (
          <View style={styles.textContent}>
            <Text style={styles.contentText}>{currentLesson.content}</Text>
          </View>
        )}

        <View style={styles.actions}>
          <TouchableOpacity
            style={[
              styles.completeButton,
              currentLesson.isCompleted && styles.completedButton,
            ]}
            onPress={handleCompleteLesson}
            disabled={currentLesson.isCompleted}
          >
            <Ionicons 
              name={currentLesson.isCompleted ? "checkmark-circle" : "checkmark"} 
              size={20} 
              color="#fff" 
            />
            <Text style={styles.completeButtonText}>
              {currentLesson.isCompleted ? 'Completed' : 'Complete Lesson'}
            </Text>
          </TouchableOpacity>
        </View>
      </ScrollView>

      <AssessmentModal
        visible={showAssessment}
        onClose={() => setShowAssessment(false)}
        onComplete={handleAssessmentComplete}
        lessonId={lessonId}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  content: {
    flex: 1,
  },
  lessonTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
    padding: 20,
    backgroundColor: '#fff',
    borderBottomWidth: 1,
    borderBottomColor: '#e0e0e0',
  },
  videoContainer: {
    backgroundColor: '#000',
    aspectRatio: 16/9,
  },
  video: {
    width: '100%',
    height: '100%',
  },
  textContent: {
    padding: 20,
    backgroundColor: '#fff',
    marginTop: 1,
  },
  contentText: {
    fontSize: 16,
    lineHeight: 24,
    color: '#333',
  },
  actions: {
    padding: 20,
    backgroundColor: '#fff',
    marginTop: 20,
  },
  completeButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#007AFF',
    borderRadius: 8,
    padding: 16,
  },
  completedButton: {
    backgroundColor: '#28a745',
  },
  completeButtonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: '600',
    marginLeft: 8,
  },
});

export default LessonContentScreen;