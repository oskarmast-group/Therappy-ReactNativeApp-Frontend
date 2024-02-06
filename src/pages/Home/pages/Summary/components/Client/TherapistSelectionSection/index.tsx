import React, {useEffect, useState} from 'react';
import Container from '../../Container';
import {BaseText} from '../../../../../../../components/Text';
import {Link} from 'react-router-native';
import {View} from 'react-native';
import styles from './styles';
import SearchIcon from '../../../../../../../resources/img/icons/SearchIcon';
import CategorySelector from '../../../../../../../components/CategorySelector';
import Category from '../../../../../../../interfaces/Category';
import TherapistCard from '../../../../../../../components/TherapistCard';
import useTherapist from '../../../../../../../state/therapists';

const TherapistSelectionSection: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState<Category | null>(
    null,
  );
  const {data: therapists, dispatcher: therapistsDispatcher} = useTherapist();

  useEffect(() => {
    therapistsDispatcher.fetchStart();
  }, [therapistsDispatcher]);

  return (
    <Container>
      <BaseText fontSize={18} weight={800} marginTop={4} marginBottom={4}>
        Aún no tienes un terapeuta asignado, encuentra uno:
      </BaseText>
      <Link to={'/terapeutas'}>
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
          {therapists.list
            .filter(({categories}) => categories.includes(selectedCategory.id))
            .map(therapist => (
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
