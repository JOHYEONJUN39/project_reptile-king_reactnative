import { View, Text, StyleSheet, ScrollView, Image, Pressable } from 'react-native'
import { Avatar } from 'react-native-elements'

const Notify = (): JSX.Element => {
  return (
    <View style={styles.container}>
      <ScrollView contentContainerStyle={styles.inner}>
        <View style={styles.notifyContainer}>
          <View style={styles.iconContainer}>
            <Avatar
              size={50}
              rounded
              icon={{ name: 'bell', type: 'font-awesome', color: '#fff' }}
              containerStyle={{ backgroundColor: '#FF80DB' }}
            />
          </View>
          <View style={styles.contentContainer}>
            <View style={styles.header}>
              <Text style={styles.commonFont}>알림 ・ 2024-03-20 19:45</Text>
              <Text style={styles.commonFont}>브리더님! 파충류의 건강상태가 의심됩니다!</Text>
            </View>
            <View style={styles.body}>
              <Image
                source={{ uri: 'https://i.postimg.cc/g0VxJ0Tq/image.jpg' }}
                style={{ width: '100%', height: '60%', borderRadius: 8 }}
              />
              <View style={{ width: '100%', height: '40%', justifyContent: 'space-between', marginTop: 10 }}>
                <Text style={styles.commonFont}>의심증상 : 탈피부전</Text>
                <Text style={styles.commonFont}>근거 : 3일간 활동량이 줄어들었습니다.</Text>
                <Pressable style={{ width: '100%', height: '30%', backgroundColor: '#072E0A', borderRadius: 8, justifyContent: 'center', alignItems: 'center' }}>
                  <Text style={styles.commonFont}>상세보기</Text>
                </Pressable>
              </View>
            </View>
          </View>
        </View>
      </ScrollView>
    </View>
  )
}

const styles = StyleSheet.create({
  commonFont: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600'
  },
  titleFont: {
    fontSize: 20,
    color: '#fff',
    fontWeight: 'bold'
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between'
  },
  container: {
    flex: 1,
    backgroundColor: '#072E0A',
    justifyContent: 'space-between'
  },
  inner: {
    paddingVertical: 24,
    alignItems: 'center'
  },
  notifyContainer: {
    width: '100%',
    height: 400,
    flexDirection: 'row',
    padding: 12,
    marginBottom: 24
  },
  iconContainer: {
    width: '15%',
    height: 50,
    marginRight: 6
  },
  contentContainer: {
    width: '80%',
    height: '100%'
  },
  header: {
    width: '100%',
    height: '20%',
    justifyContent: 'center'
  },
  body: {
    width: '100%',
    height: '80%',
    backgroundColor: '#39823E',
    borderColor: '#B1D074',
    borderWidth: 1,
    borderRadius: 16,
    padding: 18
  },
  bodyContents: {
    width: '100%',
    height: '100%',
    justifyContent: 'space-between'
  }
})

export default Notify
