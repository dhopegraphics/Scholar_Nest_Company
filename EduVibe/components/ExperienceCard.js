import React from 'react';
import { View, ScrollView, TouchableOpacity, Text, StyleSheet, Dimensions } from 'react-native';
import FeatherIcon from 'react-native-vector-icons/Feather';
import { useExperience } from '../contexts/ExperienceContext';

const CARD_WIDTH = Math.min(Dimensions.get('screen').width * 0.75, 400);

const ExperienceCard = ({ navigation }) => {
  const { items } = useExperience(); // Destructure items from context

  const navigateToExperienceDetails = (item) => {
    navigation.navigate('ExperienceDetails', { item });
  };

  return (
    <View style={styles.list}>
      <View style={styles.listHeader}>
        <Text style={styles.listTitle}>My Experience</Text>

        <TouchableOpacity
          onPress={() => {
            navigation.navigate('WorkProfile');
          }}
        >
          <Text style={styles.listAction}>View All</Text>
        </TouchableOpacity>
      </View>

      <ScrollView
        contentContainerStyle={styles.listContent}
        horizontal={true}
        showsHorizontalScrollIndicator={false}
      >
        {items && items.map(({ icon, label, company, jobType, years }, index) => (
          <TouchableOpacity
            key={index}
            onPress={() => navigateToExperienceDetails({ icon, label, company, jobType, years })}
          >
            <View style={styles.card}>
              <View style={styles.cardTop}>
                <View style={styles.cardIcon}>
                  <FeatherIcon color="#000" name={icon} size={24} />
                </View>

                <View style={styles.cardBody}>
                  <Text style={styles.cardTitle}>{label}</Text>
                  <Text style={styles.cardSubtitle}>{company}</Text>
                </View>
              </View>

              <View style={styles.cardFooter}>
                <Text style={styles.cardFooterText}>{jobType}</Text>
                <Text style={styles.cardFooterText}>{years}</Text>
              </View>
            </View>
          </TouchableOpacity>
        ))}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  list: {
    marginTop: 16,
  },
  listHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 24,
  },
  listTitle: {
    fontSize: 18,
    fontWeight: '600',
    lineHeight: 22,
    color: '#121a26',
  },
  listAction: {
    fontSize: 14,
    fontWeight: '500',
    lineHeight: 20,
    color: '#778599',
  },
  listContent: {
    paddingVertical: 12,
    paddingHorizontal: 18,
  },
  card: {
    width: CARD_WIDTH,
    paddingVertical: 16,
    paddingHorizontal: 20,
    borderRadius: 12,
    backgroundColor: '#fff',
    marginHorizontal: 6,
    shadowColor: '#90a0ca',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 1,
  },
  cardTop: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  cardIcon: {
    width: 44,
    height: 44,
    borderRadius: 9999,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#eff1f5',
  },
  cardBody: {
    paddingLeft: 12,
  },
  cardTitle: {
    fontSize: 15,
    fontWeight: '600',
    lineHeight: 18,
    color: '#121a26',
    marginBottom: 4,
  },
  cardSubtitle: {
    fontSize: 14,
    fontWeight: '500',
    lineHeight: 18,
    color: '#778599',
  },
  cardFooter: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: 18,
  },
  cardFooterText: {
    fontSize: 13,
    fontWeight: '500',
    lineHeight: 18,
    color: '#778599',
  },
});

export default ExperienceCard;
