import { createNativeStackNavigator } from '@react-navigation/native-stack'
import { Community, CommunitySearch, EditPost, Post, Posts, Write } from '../../pages'

const Stack = createNativeStackNavigator()

function CommunityStack (): JSX.Element {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Community"
        component={Community}
        options={{
          headerShown: false
        }}
      />
      <Stack.Screen
        name="Posts"
        component={Posts}
        options={{
          headerShown: false
        }}
      />
      <Stack.Screen
        name="Post"
        component={Post}
        options={{
          headerShown: false
        }}
      />
      <Stack.Screen
        name="Write"
        component={Write}
        options={{
          headerShown: false
        }}
      />
      <Stack.Screen
        name="EditPost"
        component={EditPost}
        options={{
          headerShown: false
        }}
      />
      <Stack.Screen
        name="CommunitySearch"
        component={CommunitySearch}
        options={{
          headerShown: false
        }}
      />
    </Stack.Navigator>
  )
}

export default CommunityStack
