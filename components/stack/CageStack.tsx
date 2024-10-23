import { createNativeStackNavigator } from '@react-navigation/native-stack'
import { Cage, CageDetail } from '../../pages'

const Stack = createNativeStackNavigator()

function CageStack (): JSX.Element {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Cage"
        component={Cage}
        options={{
          headerShown: false
        }}
      />
      <Stack.Screen
        name="CageDetail"
        component={CageDetail}
        options={{
          headerShown: false
        }}
      />
    </Stack.Navigator>
  )
}

export default CageStack
