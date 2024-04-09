import SubmitButton from '../../components/common/SubmitButton'
import { LinearGradient } from 'expo-linear-gradient'
import { MaterialIcons } from '@expo/vector-icons'
import { Image, Text, TextInput, TouchableOpacity, View, StyleSheet } from 'react-native'
import Line from '../common/Line'

const CommunityFooter = (): JSX.Element => {
  return (
    <View style={{ paddingHorizontal: 16 }}>
      <SubmitButton label='글쓰기' onPress={() => {}} buttonStyle={styles.submitButton} textStyle={{ fontSize: 18, fontWeight: '500' }}/>
      {/* 인기글 section */}
      <TouchableOpacity style={styles.hotPostContainer} activeOpacity={0.8}>
        <Image
          source={{ uri: 'https://i.ibb.co/ftK8PNj/image.jpg' }}
          style={styles.image} />
        <LinearGradient
          colors={['rgba(0,0,0,0)', 'rgba(0,0,0,0.7)']}
          style={styles.overlay}
          start={{ x: 0, y: 0 }}
          end={{ x: 0, y: 1 }}
        />
        <View style={styles.hotPost}>
          <Text style={[styles.titleFont, styles.hotPostTitle]} numberOfLines={1}>지구에서 가장 파충류를 잘 알고있는 사람?</Text>
          <View style={{ flexDirection: 'row' }}>
            <Text style={styles.commonFont}>1달전 ・</Text>
            <Text style={styles.commonFont}> 4,139</Text>
          </View>
        </View>
      </TouchableOpacity>
      {/* 검색 section */}
      <View style={{ flexDirection: 'row', alignItems: 'center' }}>
        <MaterialIcons name='search' size={24} color='#fff' />
        <Text style={styles.commonFont}>검색어를 입력하세요</Text>
      </View>
      <TextInput style={styles.searchInput} placeholder='검색어 입력 후 완료 혹은 돋보기' placeholderTextColor='#fff'/>
      <View style={styles.categoryContainer}>
        <View>
          <Text style={styles.categoryTitle}>홈</Text>
          <Line color='#39823E' weight={2} mV={12} />
          <View style={{ marginLeft: 8 }}>
            <Text style={styles.category}>#공지사항</Text>
            <Text style={styles.category}>#자유</Text>
            <Text style={styles.category}>#정보</Text>
          </View>
          <Text style={styles.categoryTitle}>잡답 & 꿀팁</Text>
          <Line color='#39823E' weight={2} mV={12} />
          <View style={{ marginLeft: 8 }}>
            <Text style={styles.category}>#분양</Text>
            <Text style={styles.category}>#이벤트</Text>
            <Text style={styles.category}>#팁</Text>
          </View>
          <Text style={styles.categoryTitle}>분양</Text>
          <Line color='#39823E' weight={2} mV={8} />
          <View style={{ marginLeft: 8 }}>
            <Text style={styles.category}>#도마뱀</Text>
            <Text style={styles.category}>#거북이</Text>
            <Text style={styles.category}>#뱀</Text>
            <Text style={styles.category}>#이구아나</Text>
            <Text style={styles.category}>#카멜레온</Text>
          </View>
        </View>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  titleFont: {
    color: '#fff',
    fontSize: 18,
    fontWeight: '500'
  },
  commonFont: {
    color: '#fff',
    fontSize: 16
  },
  submitButton: {
    backgroundColor: '#39823E',
    width: '100%',
    paddingVertical: 4
  },
  hotPostContainer: {
    height: 300,
    position: 'relative',
    marginBottom: 24
  },
  image: {
    width: '100%',
    height: '100%',
    borderRadius: 8
  },
  overlay: {
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    borderRadius: 8
  },
  hotPost: {
    position: 'absolute',
    left: 20,
    right: 0,
    bottom: 20,
    borderRadius: 8
  },
  hotPostTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 8
  },
  searchInput: {
    color: '#fff',
    fontSize: 16,
    flex: 1,
    height: 55,
    padding: 8,
    marginTop: 12,
    borderRadius: 8,
    borderColor: '#39823E',
    borderWidth: 1
  },
  categoryContainer: {
    justifyContent: 'space-between',
    marginVertical: 12
  },
  categoryTitle: {
    color: '#fff',
    fontSize: 20,
    fontWeight: 'bold',
    marginTop: 12
  },
  category: {
    color: '#fff',
    fontSize: 18,
    marginVertical: 6
  }
})

export default CommunityFooter
