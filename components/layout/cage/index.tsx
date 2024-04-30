import type { ReactNode } from 'react'
import { View, StyleSheet, ScrollView } from 'react-native'
import ImageHeader from '../../header/ImageHeader'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'

interface CommunityLayoutProps {
  children: ReactNode
  title: string
  subtitle: string
}

const CageLayout = ({ children, title, subtitle }: CommunityLayoutProps): JSX.Element => {
  return (
    <View style={styles.container}>
      <KeyboardAwareScrollView>
        <ScrollView contentContainerStyle={styles.inner}>
          <ImageHeader title={title} subtitle={subtitle} />
          {children}
        </ScrollView>
      </KeyboardAwareScrollView>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#072E0A'
  },
  inner: {
    height: 'auto'
  }
})

export default CageLayout
