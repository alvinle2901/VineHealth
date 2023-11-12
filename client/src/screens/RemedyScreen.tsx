import React from 'react';
import { View, Text, StyleSheet, Dimensions, TouchableOpacity } from 'react-native';
import Carousel from 'react-native-snap-carousel';

const { width: viewportWidth, height: viewportHeight } = Dimensions.get('window');

const RemedyScreen = () => {

  const remedies = [
    {
      title: 'Remedy 1',
      duration: '5',
      attempts: 1,
    },
    {
      title: 'Remedy 2',
      duration: '10',
      attempts: 1,
    }
    // ...other remedies
  ];

  const renderItem = ({item, index}) => {
    return (
      <View style={styles.card}>

        <Text style={styles.title}>{item.title}</Text>

        <TouchableOpacity style={styles.playButton}>
          <Text style={styles.playButtonText}>Play Video</Text>
        </TouchableOpacity>

        <Text style={styles.duration}>Duration: {item.duration} min</Text>
        <View style={styles.attemptSection}>
          <Text style={styles.attemptLabel}>Attempts:</Text>
          {[...Array(3)].map((e, i) => (
            <View key={i} style={[
              styles.attemptIndicator,
              i < item.attempts ? styles.attemptIndicatorFilled : null,
            ]}/>
          ))}
        </View>
      </View>
    );
  };

  return (
    <Carousel
      data={remedies}
      renderItem={renderItem}
      sliderWidth={viewportWidth}
      itemWidth={viewportWidth * 0.75}
      activeSlideAlignment={'center'}
      containerCustomStyle={styles.carouselContainer}
      inactiveSlideScale={0.94}
      inactiveSlideOpacity={0.7}
    />
  );
};

const styles = StyleSheet.create({
  carouselContainer: {
    marginTop: 50, // Adjust as needed
  },
  card: {
    backgroundColor: '#fff',
    borderRadius: 20,
    width: viewportWidth * 0.75, // 75% of the screen width
    height: viewportHeight * 0.7,
    paddingBottom: 20,
    shadowColor: '#000',
    shadowRadius: 3,
    shadowOpacity: 0.3,
    shadowOffset: { width: 0, height: 1 },
    elevation: 3,
    alignItems: 'center',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginTop: 10,
    marginHorizontal: 10,
  },
  playButton: {
    width: '100%',
    height: 200, // Adjust as needed
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#d3d3d3', // Placeholder color
    borderRadius: 4,
    marginTop: 10,
  },
  playButtonText: {
    // Placeholder styles
  },
  duration: {
    fontSize: 16,
    margin: 10,
  },
  attemptSection: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 10,
  },
  attemptLabel: {
    fontSize: 16,
    marginRight: 5,
  },
  attemptIndicator: {
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: '#d3d3d3',
    marginHorizontal: 3,
  },
  attemptIndicatorFilled: {
    backgroundColor: 'blue',
  },
  // Add other styles as needed
});

export default RemedyScreen;
