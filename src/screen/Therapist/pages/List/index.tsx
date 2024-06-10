import React, { useEffect, useMemo, useState } from "react";
import TopBar from "../../../../components/TopBar";
import { TextInput, View } from "react-native";
import styles from "./styles";
import SearchIcon from "../../../../resources/img/icons/SearchIcon";
import CategorySelector from "../../../../components/CategorySelector";
import Category from "../../../../interfaces/Category";
import TherapistCard from "../../../../components/TherapistCard";
import { BaseText } from "../../../../components/Text";
import { compareStrings } from "../../../../utils";
import { useTherapist } from "../../../../context/Therapist";
import MainContainer from "../../../../components/containers/MainContainer";
import Scrollable from "../../../../components/containers/Scrollable";

const List: React.FC = () => {
  const [search, setSearch] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<Category | null>(
    null
  );
  const { therapists, getAllTherapists } = useTherapist();

  useEffect(() => {
    const fetchTherapy = async () => {
      await getAllTherapists();
    };
    fetchTherapy();
  }, []);

  const list = useMemo(() => {
    if (selectedCategory == null) {
      return [];
    }
    const filteredCat = therapists.filter(({ categories }) =>
      categories.includes(selectedCategory.id)
    );
    const filteredSearch =
      search.length > 0
        ? filteredCat.filter(
            ({ name, lastName }) =>
              compareStrings(name ?? "", search) ||
              compareStrings(lastName ?? "", search)
          )
        : filteredCat;
    return filteredSearch;
  }, [therapists, selectedCategory, search]);

  return (
    <MainContainer withSideMenu={false} withBottomNavigation={false}>
      <TopBar title={"Terapeutas"} backRoute={"../.."} />
      <View style={styles.searchContainer}>
        <View style={styles.imageContainer}>
          <SearchIcon />
        </View>
        <TextInput
          style={styles.input}
          value={search}
          onChangeText={(value) => setSearch(value)}
        />
      </View>
      <CategorySelector
        selectedCategory={selectedCategory}
        setSelectedCategory={setSelectedCategory}
      />
      {selectedCategory !== null && (
        <BaseText fontSize={18} marginTop={10} marginBottom={10}>
          {selectedCategory.description}
        </BaseText>
      )}
      <Scrollable>
        {selectedCategory !== null && (
          <View style={styles.therapistsContainer}>
            {list.map((therapist) => (
              <TherapistCard
                key={therapist.id}
                therapist={therapist}
                clickable={true}
              />
            ))}
          </View>
        )}
      </Scrollable>
    </MainContainer>
  );
};

export default List;
