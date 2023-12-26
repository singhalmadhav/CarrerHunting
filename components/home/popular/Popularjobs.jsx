import React from 'react'
import { View, Text, TouchableOpacity, FlatList, ActivityIndicator } from 'react-native'
import { useState } from 'react'
import { useRouter } from 'expo-router'

import styles from './popularjobs.style'
import { COLORS, SIZES } from '../../../constants'
import Colors from '../../../constants/Colors'
import PopularJobCard from '../../common/cards/popular/PopularJobCard'
import useFetch from '../../../hook/useFetch'

const Popularjobs = () => {

  const router = useRouter();
  const { data, isLoading, error, refatch} = useFetch(
    'search',
    {
      query: 'React Developer',
      page: '1',
      num_pages: 1
    }
  )
  const [selectedJob, setSelectedJob] = useState();

  const handleCardPress = (item) => {
    router.push(`/job-details/${item.job_id}`);
    setSelectedJob(item.job_id);
  };

  console.log(data)

  return (
    <View style = {styles.container}>
      <View style = {styles.header}>
        <Text style={styles.headerTitle}>Popularjobs</Text>
        <TouchableOpacity>
          <Text style={styles.headerBtn}>Show All</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.cardsContainer}>
        {isLoading ? (
          <ActivityIndicator size="large" color={COLORS.primary}/>
        ): error ? (
          <Text> Something went wrong</Text>
        ): (
          <FlatList
          data={[1,2,3,4,5,6]}
          renderItem={({item}) => (
            <PopularJobCard
            item = {item}
            selectedJob={selectedJob}
            handleCardPress={handleCardPress}
            />
          )}
          keyExtractor={(item) => item?.job_id}
          contentContainerStyle = {{ columnGap: SIZES.medium}}
          horizontal
          />
        )}

      </View>
      
    </View>
  )
}

export default Popularjobs