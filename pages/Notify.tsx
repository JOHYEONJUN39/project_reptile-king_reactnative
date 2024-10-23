import { View, Text, StyleSheet, FlatList, Pressable } from 'react-native'
import { Avatar } from 'react-native-elements'
import { useEffect, useState } from 'react'
import AsyncStorage from '@react-native-async-storage/async-storage'

const Notify = (): JSX.Element => {
  const [notifications, setNotifications] = useState([]);

  useEffect(() => {
    const fetchNotifications = async () => {
      // AsyncStorage에서 알림 데이터 지우기
      // await AsyncStorage.removeItem('notifications')
      const storedNotifications = await AsyncStorage.getItem('notifications');
      if (storedNotifications) {
        setNotifications(JSON.parse(storedNotifications));
      }
    };

    void fetchNotifications();
  }, []);

  return (
    <View style={styles.container}>
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
                <Text style={styles.commonFont}>アラート゚ ・ 2024.7.10 ・ 11:22</Text>
              </View>
              <View style={styles.body}>
                <View style={{ width: '100%', height: '80%', justifyContent: 'space-between', marginTop: 10 }}>
                  <Text style={styles.titleFont}>湿度が高いです</Text>
                  <Text style={styles.commonFont}>換気扇を作動しました</Text>
                  <Pressable style={{ width: '100%', height: 40, backgroundColor: '#072E0A', borderRadius: 8, justifyContent: 'center', alignItems: 'center' }}>
                    <Text style={styles.commonFont}>飼育ケージへ</Text>
                  </Pressable>
                </View>
              </View>
            </View>
          </View>
    </View>
  )
}
//   return (
//     <View style={styles.container}>
//       <FlatList
//         data={notifications}
//         keyExtractor={(item, index) => index.toString()}
//         renderItem={({ item }) => (
//           <View style={styles.notifyContainer}>
//             <View style={styles.iconContainer}>
//               <Avatar
//                 size={50}
//                 rounded
//                 icon={{ name: 'bell', type: 'font-awesome', color: '#fff' }}
//                 containerStyle={{ backgroundColor: '#FF80DB' }}
//               />
//             </View>
//             <View style={styles.contentContainer}>
//               <View style={styles.header}>
//                 <Text style={styles.commonFont}>アラート゚ ・ {item.request.content.data.created_at}</Text>
//               </View>
//               <View style={styles.body}>
//                 <View style={{ width: '100%', height: '80%', justifyContent: 'space-between', marginTop: 10 }}>
//                   <Text style={styles.titleFont}>{item.request.content.title}</Text>
//                   <Text style={styles.commonFont}>{item.request.content.body}</Text>
//                   <Pressable style={{ width: '100%', height: 40, backgroundColor: '#072E0A', borderRadius: 8, justifyContent: 'center', alignItems: 'center' }}>
//                     <Text style={styles.commonFont}>詳細画面へ</Text>
//                   </Pressable>
//                 </View>
//               </View>
//             </View>
//           </View>
//         )}
//       />
//     </View>
//   )
// }

const styles = StyleSheet.create({
  commonFont: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600'
  },
  titleFont: {
    fontSize: 18,
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
    height: 250,
    flexDirection: 'row',
    padding: 12
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
    height: '10%'
  },
  body: {
    width: '100%',
    height: '75%',
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
