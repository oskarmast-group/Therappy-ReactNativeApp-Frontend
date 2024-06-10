import React, { useEffect } from "react";
import { StyleSheet, TouchableOpacity, View } from "react-native";
import styles from "./styles";
import { BaseText } from "../Text";
import Category from "../../types/Category";
import { DARKER_TEXT } from "../../constant/colors";
import { useCategory } from "../../context/Category";

const CategorySelector: React.FC<{
  selectedCategory: Category | null;
  setSelectedCategory: React.Dispatch<React.SetStateAction<Category | null>>;
}> = ({ selectedCategory, setSelectedCategory }) => {
  const { categories, getAllCategories } = useCategory();

  useEffect(() => {
    const fetchCategory = async () => {
      await getAllCategories();
    };
    fetchCategory();
  }, []);

  useEffect(() => {
    if (categories.length === 0) {
      return;
    }
    setSelectedCategory(categories[0]);
  }, [categories, setSelectedCategory]);

  return (
    <View style={styles.container}>
      {categories?.map((cat) => (
        <TouchableOpacity
          key={cat.id}
          style={
            cat.id === selectedCategory?.id
              ? StyleSheet.compose(styles.tab, styles.tabActive)
              : styles.tab
          }
          onPress={() => setSelectedCategory(cat)}
        >
          <BaseText
            textAlign="center"
            color={cat.id === selectedCategory?.id ? "white" : DARKER_TEXT}
          >
            {cat.title}
          </BaseText>
        </TouchableOpacity>
      ))}
    </View>
  );
};

export default CategorySelector;
