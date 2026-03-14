import React, { useState } from 'react';
import {
  ScrollView,
  RefreshControl,
  StatusBar,
  Text,
  View,
  StyleSheet,
  ActivityIndicator,
  Platform,
  Pressable
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { LinearGradient } from 'expo-linear-gradient'; // expo install expo-linear-gradient
import { Ionicons } from '@expo/vector-icons'; // expo install @expo/vector-icons

const StatusBarRefresh = () => {
  const [refreshing, setRefreshing] = useState(false);
  const [statusBarColor, setStatusBarColor] = useState('#667eea'); // màu chính
  const [longPressedId, setLongPressedId] = useState(null)

  const onRefresh = () => {
    setRefreshing(true);

    // Giả lập API call
    setTimeout(() => {
      // Chuyển màu status bar khi refresh
      setStatusBarColor('#f56565'); // đỏ cam nổi bật

      setTimeout(() => {
        setRefreshing(false);
        setStatusBarColor('#667eea'); // về màu gốc
      }, 1800);
    }, 600);
  };

  return (
    <>
      <StatusBar
        backgroundColor={statusBarColor}
        barStyle="light-content"
        animated={true}
        translucent={false}
      />

      <SafeAreaView style={styles.safeArea} edges={['top']}>
        <LinearGradient
          colors={['#667eea', '#764ba2']}
          style={styles.gradientBackground}
        >
          <ScrollView
            contentContainerStyle={styles.scrollContent}
            refreshControl={
              <RefreshControl
                refreshing={refreshing}
                onRefresh={onRefresh}
                colors={['#ffffff', '#ffd166', '#ff6b6b']} // Android: gradient-like
                tintColor="#ffffff"
                title={refreshing ? 'Đang làm mới...' : 'Kéo xuống để refresh'}
                titleColor="#ffffff"
                progressBackgroundColor="rgba(255,255,255,0.2)"
              />
            }
          >
            {/* Header */}
            <View style={styles.header}>
              <Ionicons name="refresh-circle-outline" size={64} color="#ffffff" />
              <Text style={styles.title}>StatusBar Magic</Text>
              <Text style={styles.subtitle}>
                Kéo xuống để thay đổi màu StatusBar một cách sống động!
              </Text>
            </View>

            {/* Loading indicator khi refresh */}
            {refreshing && (
              <View style={styles.loadingContainer}>
                <ActivityIndicator size="large" color="#ffffff" />
                <Text style={styles.loadingText}>Đang tải dữ liệu mới...</Text>
              </View>
            )}

            {/* Danh sách item */}
            <View style={styles.listContainer}>
              {Array.from({ length: 15 }).map((_, index) => {
                const id = index
                const isLongPressed = longPressedId === id
                return (
                  <Pressable
                    key={id}
                    onLongPress={() => setLongPressedId(id)}
                    onPressOut={() => setLongPressedId(null)}
                    delayLongPress={300}
                    style={({pressed}) => [
                      styles.card,
                      pressed && styles.cardPressed,
                      isLongPressed && styles.cardLongPressed
                    ]}
                  >
                    <Text style={styles.cardTitle}>Mục {id + 1}</Text>
                    <Text style={styles.cardDesc}>
                      Đây là nội dung mẫu đẹp mắt, có shadow nhẹ và gradient hover feel.
                    </Text>
                  </Pressable>
                )})}
            </View>

            <Text style={styles.note}>
              Kéo xuống → StatusBar chuyển đỏ cam nổi bật{"\n"}
              Hoàn thành → trở về gradient tím-xanh huyền ảo
            </Text>
          </ScrollView>
        </LinearGradient>
      </SafeAreaView >
    </>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
  },
  gradientBackground: {
    flex: 1,
  },
  scrollContent: {
    paddingHorizontal: 20,
    paddingBottom: 40,
  },
  header: {
    alignItems: 'center',
    marginTop: 20,
    marginBottom: 40,
  },
  title: {
    fontSize: 36,
    fontWeight: 'bold',
    color: '#ffffff',
    marginTop: 12,
    marginBottom: 8,
    textShadowColor: 'rgba(0,0,0,0.3)',
    textShadowOffset: { width: 0, height: 2 },
    textShadowRadius: 6,
  },
  subtitle: {
    fontSize: 18,
    color: 'rgba(255,255,255,0.85)',
    textAlign: 'center',
    lineHeight: 26,
  },
  loadingContainer: {
    alignItems: 'center',
    marginVertical: 30,
  },
  loadingText: {
    marginTop: 12,
    fontSize: 16,
    color: '#ffffff',
    fontWeight: '600',
  },
  listContainer: {
    marginBottom: 30,
  },
  card: {
    backgroundColor: 'rgba(255,255,255,0.95)',
    borderRadius: 16,
    padding: 20,
    marginBottom: 16,
    ...Platform.select({
      ios: {
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 6 },
        shadowOpacity: 0.18,
        shadowRadius: 10,
      },
      android: {
        elevation: 8,
      },
    }),
  },
  cardPressed: {
    backgroundColor: 'rgb(62, 223, 113)'
  },
  cardLongPressed: {
    backgroundColor: 'rgb(240, 136, 199)',
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: '#2d3748',
    marginBottom: 8,
  },
  cardDesc: {
    fontSize: 15,
    color: '#4a5568',
    lineHeight: 22,
  },
  note: {
    fontSize: 15,
    color: 'rgba(255,255,255,0.9)',
    textAlign: 'center',
    lineHeight: 24,
    marginTop: 20,
    fontStyle: 'italic',
  },
});

export default StatusBarRefresh;