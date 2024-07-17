import React from 'react';
import Container from '../Container';
import {BaseText} from '../../../../../../components/Text';
import {ScrollView, StyleSheet, View} from 'react-native';

const styles = StyleSheet.create({
  listContainer: {
    display: 'flex',
    gap: 10,
    flexGrow: 1,
  },
  container: {
    maxHeight: 170,
    minHeight: 70,
  },
});

const NewsSection: React.FC = () => {
  const newsList = [];

  return (
    <Container>
      <BaseText fontSize={18} weight={800} marginTop={4} marginBottom={4}>
        Avisos
      </BaseText>
      <View style={styles.container}>
        <ScrollView contentContainerStyle={styles.listContainer}>
          {newsList.length === 0 ? (
            <BaseText>Si hay avisos recientes, apareceran aquí.</BaseText>
          ) : null}
        </ScrollView>
      </View>
    </Container>
  );
};

export default NewsSection;
