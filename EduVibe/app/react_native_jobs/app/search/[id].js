import React, { useEffect, useState } from 'react';
import { ActivityIndicator, FlatList, Image, TouchableOpacity, View } from 'react-native';
import { Text, SafeAreaView } from 'react-native';
import axios from 'axios';
import { useRoute, useNavigation } from '@react-navigation/native';

import { NearbyJobCard } from '../../components';
import { COLORS, icons, SIZES } from '../../constants';
import styles from '../../styles/search';

const JobSearch = () => {
  const route = useRoute();
  const navigation = useNavigation();
  const { id } = route.params;
  const [searchResult, setSearchResult] = useState([]);
  const [searchLoader, setSearchLoader] = useState(false);
  const [searchError, setSearchError] = useState(null);
  const [page, setPage] = useState(1);

  const handleSearch = async () => {
    console.log('Search initiated', { id, page });
    setSearchLoader(true);
    setSearchResult([]);
    setSearchError(null);

    try {
      const options = {
        method: 'GET',
        url: `https://jsearch.p.rapidapi.com/search`,
        headers: {
          'X-RapidAPI-Key': '8d45a4f107msh0c9df57ac4e941cp1a476cjsn6eb42e7c314d',
          'X-RapidAPI-Host': 'jsearch.p.rapidapi.com',
        },
        params: {
          query: id,
          page: page.toString(),
        },
      };

      const response = await axios.request(options);
      console.log('Search response', response.data);
      setSearchResult(response.data.data);
    } catch (error) {
      console.error('Search error', error);
      setSearchError('Failed to fetch data. Please try again later.');
    } finally {
      setSearchLoader(false);
    }
  };

  const handlePagination = (direction) => {
    console.log('Pagination', { direction, currentPage: page });
    if (direction === 'left' && page > 1) {
      setPage(page - 1);
      handleSearch();
    } else if (direction === 'right') {
      setPage(page + 1);
      handleSearch();
    }
  };

  useEffect(() => {
    handleSearch();
  }, []);

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: COLORS.lightWhite }}>
      <FlatList
        data={searchResult}
        renderItem={({ item }) => (
          <NearbyJobCard
            job={item}
            handleNavigate={() => {
              console.log('Navigating to JobDetails', { jobId: item.job_id });
              navigation.navigate('JobDetails', { jobId: item.job_id });
            }}
          />
        )}
        keyExtractor={(item) => item.job_id}
        contentContainerStyle={{ padding: SIZES.medium, rowGap: SIZES.medium }}
        ListHeaderComponent={() => (
          <>
            <View style={styles.container}>
              <Text style={styles.searchTitle}>{id}</Text>
              <Text style={styles.noOfSearchedJobs}>Job Opportunities</Text>
            </View>
            <View style={styles.loaderContainer}>
              {searchLoader ? (
                <ActivityIndicator size='large' color={COLORS.primary} />
              ) : searchError ? (
                <Text>{searchError}</Text>
              ) : (
                <Text>No results found</Text>
              )}
            </View>
          </>
        )}
        ListFooterComponent={() => (
          <View style={styles.footerContainer}>
            <TouchableOpacity
              style={styles.paginationButton}
              onPress={() => handlePagination('left')}
            >
              <Image
                source={icons.chevronLeft}
                style={styles.paginationImage}
                resizeMode='contain'
              />
            </TouchableOpacity>
            <View style={styles.paginationTextBox}>
              <Text style={styles.paginationText}>{page}</Text>
            </View>
            <TouchableOpacity
              style={styles.paginationButton}
              onPress={() => handlePagination('right')}
            >
              <Image
                source={icons.chevronRight}
                style={styles.paginationImage}
                resizeMode='contain'
              />
            </TouchableOpacity>
          </View>
        )}
      />
    </SafeAreaView>
  );
};

export default JobSearch;
