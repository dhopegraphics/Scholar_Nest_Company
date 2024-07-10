import React from 'react';
import { StyleSheet, View, TouchableOpacity, Image, Text } from 'react-native';
import PropTypes from 'prop-types';

const CourseCard = ({ title, creator, participantsCount, onPress, imageSource }) => {
  return (
    <TouchableOpacity
      onPress={onPress}
      style={styles.card}
      activeOpacity={0.7}
      accessibilityLabel={`${title} course card`}
      accessibilityHint={`Tap to view details about ${title}`}
    >
      <Image source={imageSource} style={styles.cardImg} />
      <View style={styles.cardBody}>
        <Text style={styles.cardTitle}>{title}</Text>
        <Text style={styles.cardCreator}>{creator}</Text>
        <Text style={styles.cardParticipants}>Participants: {participantsCount}</Text>
      </View>
    </TouchableOpacity>
  );
};

CourseCard.propTypes = {
  title: PropTypes.string.isRequired,
  creator: PropTypes.string.isRequired,
  participantsCount: PropTypes.number.isRequired,
  onPress: PropTypes.func.isRequired,
  imageSource: PropTypes.oneOfType([
    PropTypes.shape({
      uri: PropTypes.string.isRequired,
    }),
    PropTypes.number, // for local images
  ]).isRequired,
};

const styles = StyleSheet.create({
  card: {
    borderRadius: 8,
    backgroundColor: '#fff',
    marginRight: 16,
    width: 270, // Make the card smaller
    shadowColor: 'rgba(0, 0, 0, 0.5)',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.2,
    shadowRadius: 1.41,
    elevation: 2,
  },
  cardImg: {
    width: '100%',
    height: 100, // Adjust the height to make the card smaller
    borderTopLeftRadius: 8,
    borderTopRightRadius: 8,
  alignContent : "center",
  alignItems : "center"
  
  },
  cardBody: {
    padding: 12,
  },
  cardTitle: {
    fontSize: 16,
    fontWeight: '500',
    color: '#232425',
  },
  cardCreator: {
    marginTop: 4,
    fontSize: 14,
    color: '#333',
  },
  cardParticipants: {
    marginTop: 4,
    fontSize: 12,
    color: '#666',
  },
});

export default CourseCard;
