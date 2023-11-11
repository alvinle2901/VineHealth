import {
  View,
  Text,
  Image,
  TouchableOpacity,
  ScrollView,
  StyleSheet
} from 'react-native'
import React, { useState } from 'react'
import moment from 'moment'
import { colors } from '../constants/colors'
import { TextInput } from 'react-native-gesture-handler'
import { getAuth } from 'firebase/auth'
import { app } from '../../firebase.config'

type Props = {
  navigation: any
}
const CalendarStreak = ({ streak }) => {
  const daysInWeek = Array.from({ length: 7 }, (_, i) =>
    moment().startOf('week').add(i, 'days')
  );

  return (
    <View style={styles.streakContainer}>
      {daysInWeek.map((day, index) => (
        <View key={index} style={styles.dayContainer}>
          <Text style={styles.dayLabel}>
            {day.format('dd').charAt(0)} {/* First letter of the day */}
          </Text>
          <View
            style={[
              styles.dayIndicator,
              streak.includes(day.format('YYYY-MM-DD')) ? styles.activeDay : {},
            ]}
          >
            <Text style={styles.dayNumber}>{day.format('D')}</Text>
          </View>
        </View>
      ))}
    </View>
  );
};

const CurrentStatus = () => {
  // Define your tags and states here
  const tags = [
    { text: 'Sinusitis' },
    { text: 'Women' },
    { text: '38yr' },
  ];
  
  const feelings = ['Wheezy breathing']; // This can be dynamic based on the state
  const userStreak = ['2023-11-11', '2023-11-12'];

  return (
    <View style={styles.card}>
      <View style={styles.tagRow}>
        {tags.map((tag, index) => (
          <View key={index} style={[styles.tag]}>
            <Text style={styles.tagText}>{tag.text}</Text>
          </View>
        ))}
      </View>
      <View style={styles.tagRow}>
        <Text>Today, I'm feeling:</Text>
        {feelings.map((feeling, index) => (
          <View key={index} style={styles.tag}>
            <Text style={styles.tagText}>{feeling}</Text>
          </View>
        ))}
      </View>
      <CalendarStreak streak={userStreak}></CalendarStreak>
      <Text style={[{textAlign: 'center', fontWeight: 'bold',}]}> {userStreak.length} day streak </Text>
    </View>
  );
};
const HomeScreen = ({ navigation }: Props) => {
  const [feeling, setFeeling] = useState('')

  const auth = getAuth(app)
  console.log(auth)
  

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      {/* Logo */}
      {/* Header */}
      <View style={styles.statusHeader}> 
        <Text style={styles.heading}>Hello, Khoa</Text>
        <TouchableOpacity onPress={() => navigation.navigate('Symptoms')}>
          <Text style={styles.editText}> Edit </Text>
        </TouchableOpacity>
      </View>
      {/* Current */}
      <CurrentStatus />

      <ScrollView horizontal>
        <View >

        </View>

      </ScrollView>

      {/* Attempts */}
      <View style={styles.attempts}>
        {/* Card Title */}
        <View style={[styles.cardContent, { top: '0%' }]}>
          <Text
            style={[
              styles.cardTitle,
              {
                color: colors.heading,
                fontSize: 20,
                fontWeight: 'normal'
              }
            ]}
          >
            Attempting solution: Remedy 1
          </Text>
        </View>
        {/* Text Input */}
        <TextInput
          value={feeling}
          style={styles.attemptInput}
          placeholder={'How do you feel about it?'}
          onChangeText={(e) => setFeeling(e)}
        />
        {/* Buttons */}
        <View
          style={{
            bottom: '10%',
            position: 'absolute',
            flexDirection: 'row'
          }}
        >
          <View style={{ flex: 1, alignItems: 'center' }}>
            <TouchableOpacity
              style={[
                styles.cardBtn,
                {
                  backgroundColor: colors.whiteShadeBg,
                  padding: 5,
                  alignItems: 'center',
                  justifyContent: 'center'
                }
              ]}
            >
              <Text style={[styles.btnLabel, { fontSize: 18 }]}>POST</Text>
            </TouchableOpacity>
          </View>
          <View style={{ flex: 1, alignItems: 'center' }}>
            <TouchableOpacity
              style={[
                styles.cardBtn,
                {
                  backgroundColor: colors.whiteShadeBg,
                  padding: 5,
                  alignItems: 'center',
                  justifyContent: 'center'
                }
              ]}
            >
              <Text style={[styles.btnLabel, { fontSize: 18 }]}>FINISH</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>

      {/* Feedback */}
      <Text style={styles.header2}>What's happening</Text>
      <View style={{ marginBottom: 50 }}>
        {/* Profile img */}
      <View style={styles.card}>
        <Text style={styles.title}>Going to the sauna</Text>
        <View style={styles.reviewHeader}>
        <Image style={styles.avatar} source={require('../../assets/images/image13.png')} />
          <View style={styles.headerContent}>
            <Text style={styles.name}>Daniel</Text>
            <Text style={styles.time}>5m</Text>
          </View>
          <Text style={[styles.statusTag]}>
          Sinusitis
          </Text>
        </View>
        <Text style={styles.reviewText}>“Today is only the 2nd day my sinuses felt much better.”</Text>
      </View>
      <View style={styles.card}>
        <Text style={styles.title}>Moisten Sinus</Text>
        <View style={styles.reviewHeader}>
        <Image style={styles.avatar} source={require('../../assets/images/image15.png')} />
          <View style={styles.headerContent}>
            <Text style={styles.name}>User123</Text>
            <Text style={styles.time}>3h</Text>
          </View>
          <Text style={[styles.statusTag]}>
          Wheezy breathing
          </Text>
        </View>
        <Text style={styles.reviewText}>“It’s just not for me.”</Text>
      </View>
      <View style={styles.card}>
        <Text style={styles.title}>Rinse nasal passages</Text>
        <View style={styles.reviewHeader}>
        <Image style={styles.avatar} source={require('../../assets/images/image14.png')} />
          <View style={styles.headerContent}>
            <Text style={styles.name}>Linda</Text>
            <Text style={styles.time}>4h</Text>
          </View>
          <Text style={[styles.statusTag]}>
          Sinusitis
          </Text>
        </View>
        <Text style={styles.reviewText}>“Just try it for one day friends. Finally can breathe now.”</Text>
      </View>
      </View>
    </ScrollView>
  )
}

export default HomeScreen

const styles = StyleSheet.create({
  container: {
    display: 'flex',
    flex: 1,
    padding: 20,
    backgroundColor: colors.white
  },
  heading: {
    fontFamily: 'HelveticaNeue',
    fontSize: 28,
    fontWeight: 'bold',
    marginTop: 30
  },
  subHeading: {
    fontFamily: 'HelveticaNeue',
    fontSize: 20,
    fontWeight: '300',
    marginTop: 10
  },
  section1: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 30,
    marginBottom: 30
  },
  item1: {
    backgroundColor: '#8E97FD',
    flex: 1,
    marginRight: 10,
    marginBottom: 10,
    marginTop: 10,
    borderRadius: 20,
    justifyContent: 'space-between',
    overflow: 'hidden'
  },
  item2: {
    backgroundColor: '#FFC97E',
    flex: 1,
    marginLeft: 10,
    marginBottom: 10,
    marginTop: 10,
    borderRadius: 20,
    overflow: 'hidden'
  },
  basicImg: {
    alignSelf: 'flex-end'
  },
  cardContent: {
    position: 'absolute',
    top: '35%',
    padding: 15
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    fontFamily: 'HelveticaNeue'
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 15,
    marginTop: '0%',
    alignItems: 'center'
  },
  cardBtn: {
    borderRadius: 50
  },
  btnLabel: {
    fontFamily: 'HelveticaNeue',
    fontSize: 12,
    paddingTop: 10,
    paddingBottom: 10,
    marginLeft: 15,
    marginRight: 15,
    color: colors.heading
  },
  attempts: {
    backgroundColor: '#afdbc5',
    marginBottom: 10,
    marginTop: 20,
    borderRadius: 20,
    width: 'auto',
    height: 250
  },
  attemptInput: {
    top: '30%',
    position: 'absolute',
    height: 70,
    backgroundColor: colors.whiteShade,
    borderRadius: 20,
    paddingHorizontal: 50,
    alignSelf: 'center'
  },
  title: {
    fontWeight: 'bold',
    fontSize: 15,
    marginBottom: 8,
  },
  reviewHeader: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  avatar: {
    width: 50,
    height: 50,
    borderRadius: 25,
  },
  headerContent: {
    flex: 1,
    marginHorizontal: 10,
  },
  name: {
    fontWeight: 'bold',
  },
  time: {
    color: 'grey',
  },
  statusTag: {
    color: 'white',
    borderRadius: 15,
    overflow: 'hidden',
    paddingHorizontal: 10,
    paddingVertical: 2,
    textAlign: 'center',
    backgroundColor: colors.primary
  },
  reviewText: {
    marginTop: 8,
    fontSize: 11,
  },
  likeIcon: {
    position: 'absolute',
    bottom: 10,
    right: 10,
    fontSize: 24,
  },
  header2: {
    fontWeight: 'bold',
    fontSize: 17,
    marginBottom: 8,
  }, 
  tagRow: {
    flexDirection: 'row',
    alignItems: 'center', 
    marginTop: 10, 
    marginBottom: 20,
  },
  tag: {
    paddingVertical: 5,
    paddingHorizontal: 10,
    borderRadius: 15,
    backgroundColor: colors.primary, 
    marginRight: 8,
  },
  tagText: {
    color: '#fff',
    fontSize: 14,
  },
  card: {
    backgroundColor: colors.white, // Assuming colors.white is the color of the card
    marginBottom: 20,
    marginTop: 20,
    borderRadius: 20,
    padding: 20, // Add padding to create space within the card
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 6,
    elevation: 5,
  }, 
  statusHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center', // This ensures vertical centering
  },
  editText: {
    fontSize: 14, 
  },
  streakContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 16,
    paddingHorizontal: 8,
  },
  dayContainer: {
    alignItems: 'center',
  },
  dayLabel: {
    fontSize: 16,
    color: '#333',
    marginBottom: 4,
  },
  dayIndicator: {
    width: 30,
    height: 30,
    borderRadius: 15,
    backgroundColor: '#e0e0e0',
    justifyContent: 'center',
    alignItems: 'center',
  },
  activeDay: {
    backgroundColor: colors.primary,
  },
  dayNumber: {
    fontSize: 14,
    color: '#333',
  }
})
