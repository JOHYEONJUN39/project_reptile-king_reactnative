import React from 'react';
import { View, Text } from 'react-native';
import { Link } from '@react-navigation/native';

const BackPage = () => {

  return (
    <View>
      <Text>Back Page</Text>
      <Link to="/Search">Go to Search</Link>
    </View>
  );
};

export default BackPage;
