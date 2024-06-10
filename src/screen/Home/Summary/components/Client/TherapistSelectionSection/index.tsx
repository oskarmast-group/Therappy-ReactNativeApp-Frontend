import React, { useEffect, useState } from "react";
import Container from "../../Container";
import { Link } from "react-router-native";
import { View } from "react-native";
import styles from "./styles";
import { BaseText } from "../../../../../../components/Text";
import SearchIcon from "../../../../../../../assets/images/icons/SearchIcon";
import Category from "../../../../../../types/Category";
import TherapistCard from "../../../../../../components/TherapistCard";
import CategorySelector from "../../../../../../components/CategorySelector";
import { useTherapist } from "../../../../../../context/Therapist";

const TherapistSelectionSection: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState<Category | null>(
    null
  );
  const { therapists, getAllTherapists } = useTherapist();

  useEffect(() => {
    const fetchTherapists = async () => {
      await getAllTherapists();
    };
    fetchTherapists();
  }, []);

  return (
    <Container>
      <BaseText fontSize={18} weight={800} marginTop={4} marginBottom={4}>
        Aún no tienes un terapeuta asignado, encuentra uno:
      </BaseText>
      <Link to={"/terapeutas"}>
        <View style={styles.linkContainer}>
          <View style={styles.iconContainer}>
            <SearchIcon />
          </View>
        </View>
      </Link>
      <CategorySelector
        selectedCategory={selectedCategory}
        setSelectedCategory={setSelectedCategory}
      />
      {selectedCategory !== null && (
        <BaseText fontSize={18}>{selectedCategory.description}</BaseText>
      )}
      {selectedCategory !== null && (
        <View style={styles.therapistsContainer}>
          {therapists
            .filter(({ categories }) =>
              categories.includes(selectedCategory.id)
            )
            .map((therapist) => (
              <TherapistCard
                key={therapist.id}
                therapist={therapist}
                clickable={true}
              />
            ))}
        </View>
      )}
    </Container>
  );
};

export default TherapistSelectionSection;
