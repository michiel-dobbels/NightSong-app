import React, { useState } from 'react';
import {
  View,
  Text,
  useWindowDimensions,
  StyleSheet,
  TouchableOpacity,
  Image,
  Animated,
} from 'react-native';
import { TabView, SceneMap } from 'react-native-tab-view';
import { SafeAreaView } from 'react-native-safe-area-context';

const ForYouRoute = () => (
  <View style={styles.content}>
    <Text style={styles.contentText}>For You Content</Text>
  </View>
);

const FollowingRoute = () => (
  <View style={styles.content}>
    <Text style={styles.contentText}>Following Content</Text>
  </View>
);

export default function HomeScreen() {
  const layout = useWindowDimensions();
  const [index, setIndex] = useState(0);
  const [routes] = useState([
    { key: 'foryou', title: 'For you' },
    { key: 'following', title: 'Following' },
  ]);

  const renderScene = SceneMap({
    foryou: ForYouRoute,
    following: FollowingRoute,
  });

  return (
    <SafeAreaView style={styles.safeArea}>
      {/* Top Logo */}
      <View style={styles.topBar}>
        <Image
          source={require('../../assets/logo.png')} // adjust path if needed
          style={styles.logo}
          resizeMode="contain"
        />
      </View>

      {/* Tab View Content */}
      <TabView
        navigationState={{ index, routes }}
        renderScene={renderScene}
        onIndexChange={setIndex}
        initialLayout={{ width: layout.width }}
        renderTabBar={({ position }) => (
          <View style={styles.tabs}>
            {routes.map((route, i) => (
              <TouchableOpacity
                key={route.key}
                onPress={() => setIndex(i)}
                style={styles.tabButton}
              >
                <Text style={styles.tabText}>{route.title}</Text>
              </TouchableOpacity>
            ))}
            <Animated.View
              style={[
                styles.underline,
                {
                  transform: [
                    {
                      translateX: position.interpolate({
                        inputRange: [0, 1],
                        outputRange: [0, layout.width / 2], // assumes 2 tabs
                      }),
                    },
                  ],
                },
              ]}
            />
          </View>
        )}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#061e45',
  },
  topBar: {
    alignItems: 'center',
    paddingTop: 36, // ensures space below notch
    paddingBottom: 10,
  },
  logo: {
    width: 28,
    height: 28,
  },
  tabs: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#1a2e52',
  },
  tabText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 16,
    paddingBottom: 6,
  },
  activeTab: {
    borderBottomWidth: 3,
    borderBottomColor: '#7814db',
  },
  content: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  contentText: {
    color: 'white',
  },
  tabButton: {
    flex: 1,
    alignItems: 'center',
  },
  underline: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    width: '50%',
    height: 3,
    backgroundColor: '#7814db',
  },
});
