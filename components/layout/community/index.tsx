import type { ReactNode } from 'react'
import { View, StyleSheet, ScrollView } from 'react-native'
import ImageHeader from '../../header/ImageHeader'
import CommunityFooter from '../../footer/CommunityFooter'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'

interface CommunityLayoutProps {
  children: ReactNode
  title: string
  subtitle: string
  footer?: boolean
}

const CommunityLayout = ({ children, title, subtitle, footer = true }: CommunityLayoutProps): JSX.Element => {
  return (
    <View style={styles.container}>
      <KeyboardAwareScrollView>
        <ScrollView contentContainerStyle={styles.inner}>
          <ImageHeader title={title} subtitle={subtitle} />
          {children}
          {footer && <CommunityFooter />}
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

export default CommunityLayout
