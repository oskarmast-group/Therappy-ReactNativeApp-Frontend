import React, { useEffect } from 'react';
import { StyleSheet, TouchableOpacity, View } from 'react-native';
import styles from './styles';
import { BaseText } from '../Text';
import { DARKER_TEXT } from '../../resources/constants/colors';
import useCategories from '../../state/categories';
import Category from '../../interfaces/Category';

const CategorySelector: React.FC<{
  selectedCategory: Category | null;
  setSelectedCategory: React.Dispatch<React.SetStateAction<Category | null>>;
}> = ({ selectedCategory, setSelectedCategory }) => {
  const { data: categories, dispatcher: categoriesDispatcher } = useCategories();

  useEffect(() => {
    categoriesDispatcher.fetchStart();
  }, [categoriesDispatcher]);

  useEffect(() => {
    if (categories.list.length === 0) {
      return;
    }
    setSelectedCategory(categories.list[0]);
  }, [categories.list, setSelectedCategory]);

  return (
    <View style={styles.container}>
      {categories?.list.map((cat) => (
        <TouchableOpacity
          key={cat.id}
          style={cat.id === selectedCategory?.id ? StyleSheet.compose(styles.tab, styles.tabActive) : styles.tab}
          onPress={() => setSelectedCategory(cat)}
        >
          <BaseText textAlign="center" color={cat.id === selectedCategory?.id ? 'white' : DARKER_TEXT}>
            {cat.title}
          </BaseText>
        </TouchableOpacity>
      ))}
    </View>
  );
};

export default CategorySelector;
