import React, { useState, useEffect, useRef } from 'react';
import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  Dimensions,
  Animated,
  PanResponder,
} from 'react-native';

import { Image } from 'expo-image';
import { StatusBar } from 'expo-status-bar';
import { Ionicons } from '@expo/vector-icons';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { FeaturedTech, FEATURED_TECHS, Story, StoriesData, STORIES_DATA } from '@/data/storiesData';

const { width, height } = Dimensions.get('window');
const PROGRESS_BAR_HEIGHT = 3;
const STORY_DURATION = 5000; // 5 seconds per story

export default function StoriesScreen() {
  const router = useRouter();
  const { techId = '1' } = useLocalSearchParams<{ techId: string }>();
  
  // Get stories for a tech
  const getStoriesForTech = (techId: string): Story[] => {
    const techStories = STORIES_DATA.find(data => data.techId === techId);
    return techStories ? techStories.stories : [];
  };
  
  // Get all tech IDs with stories - ensures we only use techs that actually have stories
  const techsWithStories = React.useMemo(() => 
    STORIES_DATA
      .filter(data => data.stories.length > 0)
      .map(data => data.techId)
  , []);
  
  // Make sure we have a valid initial tech
  const initialTech = techsWithStories.includes(techId) ? techId : techsWithStories[0];
  
  // State for the currently displayed tech and story
  const [currentTech, setCurrentTech] = useState(initialTech);
  const [stories, setStories] = useState<Story[]>(getStoriesForTech(initialTech));
  const [currentStoryIndex, setCurrentStoryIndex] = useState(0);
  const [paused, setPaused] = useState(false);
  const [watched, setWatched] = useState<Record<string, boolean>>({}); 
  
  // Current tech index
  const currentTechIndex = techsWithStories.indexOf(currentTech);
  
  // Refs for animation and timers
  const progressAnim = useRef(new Animated.Value(0)).current;
  const storyTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  
  // Pan responder for swipe gestures
  const panResponder = useRef(
    PanResponder.create({
      onStartShouldSetPanResponder: () => true,
      onMoveShouldSetPanResponder: (_, gestureState) => {
        const { dx, dy } = gestureState;
        // Only handle significant movements
        return Math.abs(dx) > 10 || Math.abs(dy) > 10;
      },
      onPanResponderGrant: () => {
        // Pause the story when the user touches the screen
        setPaused(true);
        if (storyTimeoutRef.current) {
          clearTimeout(storyTimeoutRef.current);
        }
        progressAnim.stopAnimation();
      },
      onPanResponderRelease: (_, gestureState) => {
        const { dx, dy } = gestureState;
        setPaused(false);
        
        // Swipe down (close stories)
        if (dy > 70) {
          router.back();
          return;
        }
        
        // Swipe right (previous story or tech)
        if (dx > 50) {
          goToPrevious();
          return;
        } 
        // Swipe left (next story or tech)
        else if (dx < -50) {
          goToNext();
          return;
        } 
        // No swipe, just continue current story
        else {
          startProgressAnimation();
        }
      },
    }),
  ).current;
  
  // Get the current tech's data
  const techData = FEATURED_TECHS.find((tech: FeaturedTech) => tech.id === currentTech);
  
  // Clean, simple progress animation function
  const startProgressAnimation = () => {
    // Reset animation value
    progressAnim.setValue(0);
    
    // Clear any existing timeout to avoid multiple timers
    if (storyTimeoutRef.current) {
      clearTimeout(storyTimeoutRef.current);
      storyTimeoutRef.current = null;
    }
    
    // Start animation
    Animated.timing(progressAnim, {
      toValue: 1,
      duration: STORY_DURATION,
      useNativeDriver: false,
    }).start();
    
    // Set timeout to advance to next story after duration
    // This is the only timer that controls story progression
    storyTimeoutRef.current = setTimeout(() => {
      if (!paused) {
        goToNext();
      }
    }, STORY_DURATION);
  };
  
  // Extremely simplified goToNext function
  const goToNext = () => {
    // Always cancel timers first
    if (storyTimeoutRef.current) {
      clearTimeout(storyTimeoutRef.current);
      storyTimeoutRef.current = null;
    }
    
    // Stop any animations
    progressAnim.stopAnimation();
    
    // Mark current story as watched
    setWatched(prev => ({ ...prev, [`${currentTech}-${currentStoryIndex}`]: true }));
    
    // Is there another story for this tech?
    if (currentStoryIndex < stories.length - 1) {
      // Go to next story within same tech
      setCurrentStoryIndex(currentStoryIndex + 1);
    } else {
      // We need to go to next tech
      const nextTechIndex = currentTechIndex + 1;
      
      // Are there more techs?
      if (nextTechIndex < techsWithStories.length) {
        // Go to first story of next tech
        const nextTech = techsWithStories[nextTechIndex];
        setCurrentTech(nextTech);
        setCurrentStoryIndex(0);
      } else {
        // No more techs, exit stories
        router.back();
      }
    }
  };
  
  // Improved goToPrevious function that resets animation
  const goToPrevious = () => {
    // Always cancel timers first
    if (storyTimeoutRef.current) {
      clearTimeout(storyTimeoutRef.current);
      storyTimeoutRef.current = null;
    }
    
    // Stop any animations and reset progress to 0 (unwatched)
    progressAnim.stopAnimation();
    progressAnim.setValue(0);
    
    // Are we on the first story of this tech?
    if (currentStoryIndex > 0) {
      // Remove the current story from watched when going back
      // This ensures the story appears fresh when returning to it
      setWatched(prev => {
        const newWatched = { ...prev };
        delete newWatched[`${currentTech}-${currentStoryIndex}`];
        return newWatched;
      });
      
      // Just go to previous story within same tech
      setCurrentStoryIndex(currentStoryIndex - 1);
    } else {
      // We need to go to previous tech
      const prevTechIndex = currentTechIndex - 1;
      
      // Is there a previous tech?
      if (prevTechIndex >= 0) {
        // Go to last story of previous tech
        const prevTech = techsWithStories[prevTechIndex];
        const prevTechStories = getStoriesForTech(prevTech);
        const lastStoryIndex = prevTechStories.length - 1;
        
        // Remove the last story of previous tech from watched list
        setWatched(prev => {
          const newWatched = { ...prev };
          delete newWatched[`${prevTech}-${lastStoryIndex}`];
          return newWatched;
        });
        
        setCurrentTech(prevTech);
        setCurrentStoryIndex(lastStoryIndex);
      }
      // If we're already at the first tech & story, do nothing
    }
  };
  
  // Handle tech profile button press
  const handleProfilePress = () => {
    router.push(`/tech-profile?id=${currentTech}`);
  };
  
  // Simple effect to load stories when tech changes
  useEffect(() => {
    // Load stories for this tech
    const techStories = getStoriesForTech(currentTech);
    setStories(techStories);
    
    // Clean up any running timers when tech changes
    if (storyTimeoutRef.current) {
      clearTimeout(storyTimeoutRef.current);
      storyTimeoutRef.current = null;
    }
    
    // Reset animation
    progressAnim.setValue(0);
  }, [currentTech]);
  
  // Simple effect to start progress animation when story index changes
  useEffect(() => {
    // Don't run animation if there are no stories
    if (stories.length === 0) return;
    
    // Clean up any running timers
    if (storyTimeoutRef.current) {
      clearTimeout(storyTimeoutRef.current);
      storyTimeoutRef.current = null;
    }
    
    // Reset animation value
    progressAnim.setValue(0);
    
    // Mark current story as watched (only needed for UI indicators)
    setWatched(prev => ({ ...prev, [`${currentTech}-${currentStoryIndex}`]: true }));
    
    // Start new progress animation - use short delay to ensure state is settled
    setTimeout(() => {
      if (!paused) {
        startProgressAnimation();
      }
    }, 50);
    
    return () => {
      // Clean up timer on unmount or when story changes
      if (storyTimeoutRef.current) {
        clearTimeout(storyTimeoutRef.current);
        storyTimeoutRef.current = null;
      }
    };
  }, [currentStoryIndex, currentTech, paused]);
  
  // Get the current story
  const currentStory = stories[currentStoryIndex];
  
  if (!techData || !currentStory) {
    return (
      <View style={styles.container}>
        <Text>No stories available</Text>
        <TouchableOpacity onPress={() => router.back()}>
          <Text>Go Back</Text>
        </TouchableOpacity>
      </View>
    );
  }
  
  return (
    <View style={styles.container}>
      <StatusBar style="light" />
      
      {/* Story content with pan responder for gestures */}
      <View 
        style={styles.storyContainer}
        {...panResponder.panHandlers}
      >
        {/* Tap areas for easier navigation - MUST be at the end of the JSX for proper z-index */}
        {/* Progress bars */}
        <View style={styles.progressContainer}>
          {stories.map((_, index) => (
            <View key={index} style={styles.progressBarContainer}>
              <Animated.View 
                style={[
                  styles.progressBar,
                  {
                    width: index === currentStoryIndex
                      ? progressAnim.interpolate({
                          inputRange: [0, 1],
                          outputRange: ['0%', '100%'],
                        })
                      : index < currentStoryIndex
                      ? '100%'
                      : '0%',
                  },
                ]}
              />
            </View>
          ))}
        </View>
        
        {/* Header with profile info and buttons */}
        <View style={styles.header}>
          <View style={styles.profileContainer}>
            <Image 
              source={techData.profileImage} 
              style={styles.profileImage} 
            />
            <Text style={styles.profileName}>{techData.name}</Text>
            <Text style={styles.timestamp}>
              {new Date(currentStory.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
            </Text>
          </View>
          
          <View style={styles.actionsContainer}>
            <TouchableOpacity 
              style={styles.actionButton}
              onPress={() => router.back()}
            >
              <Ionicons name="close" size={24} color="#fff" />
            </TouchableOpacity>
          </View>
        </View>
        
        {/* Story image */}
        <Image 
          source={currentStory.image} 
          style={styles.storyImage} 
          resizeMode="cover"
        />
        
        {/* Caption */}
        {currentStory.caption && (
          <View style={styles.captionContainer}>
            <Text style={styles.caption}>{currentStory.caption}</Text>
          </View>
        )}
        
        {/* View profile button */}
        <TouchableOpacity 
          style={styles.viewProfileButton}
          onPress={handleProfilePress}
        >
          <Text style={styles.viewProfileText}>View Profile</Text>
        </TouchableOpacity>
        
        {/* Touch areas for navigation - placed at the end for proper z-index */}
        <TouchableOpacity 
          style={styles.leftTapArea} 
          activeOpacity={1}
          onPress={goToPrevious}
        />
        <TouchableOpacity 
          style={styles.rightTapArea} 
          activeOpacity={1}
          onPress={goToNext}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000',
  },
  storyContainer: {
    flex: 1,
    justifyContent: 'center',
  },
  leftTapArea: {
    position: 'absolute',
    left: 0,
    top: 0,
    width: width * 0.3,
    height: height,
    zIndex: 5,
  },
  rightTapArea: {
    position: 'absolute',
    right: 0,
    top: 0,
    width: width * 0.3,
    height: height,
    zIndex: 5,
  },
  progressContainer: {
    flexDirection: 'row',
    position: 'absolute',
    top: 50,
    left: 10,
    right: 10,
    zIndex: 10,
  },
  progressBarContainer: {
    flex: 1,
    height: PROGRESS_BAR_HEIGHT,
    backgroundColor: 'rgba(255, 255, 255, 0.3)',
    marginHorizontal: 2,
    borderRadius: PROGRESS_BAR_HEIGHT / 2,
    overflow: 'hidden',
  },
  progressBar: {
    height: '100%',
    backgroundColor: '#fff',
  },
  header: {
    position: 'absolute',
    top: 60,
    left: 0,
    right: 0,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 16,
    zIndex: 10,
  },
  profileContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  profileImage: {
    width: 36,
    height: 36,
    borderRadius: 18,
    borderWidth: 2,
    borderColor: '#fff',
  },
  profileName: {
    color: '#fff',
    fontWeight: '600',
    fontSize: 16,
    marginLeft: 8,
  },
  timestamp: {
    color: 'rgba(255, 255, 255, 0.7)',
    fontSize: 12,
    marginLeft: 8,
  },
  actionsContainer: {
    flexDirection: 'row',
  },
  actionButton: {
    width: 36,
    height: 36,
    justifyContent: 'center',
    alignItems: 'center',
  },
  storyImage: {
    width,
    height: height * 0.8,
  },
  captionContainer: {
    position: 'absolute',
    bottom: 100,
    left: 16,
    right: 16,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    padding: 12,
    borderRadius: 8,
  },
  caption: {
    color: '#fff',
    fontSize: 16,
  },
  viewProfileButton: {
    position: 'absolute',
    bottom: 40,
    alignSelf: 'center',
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 20,
  },
  viewProfileText: {
    color: '#fff',
    fontWeight: '600',
    fontSize: 16,
  },
});
