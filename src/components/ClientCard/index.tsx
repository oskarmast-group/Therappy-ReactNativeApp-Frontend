import React, {PropsWithChildren, useState} from 'react';
import {ActivityIndicator, Image, TouchableHighlight, View} from 'react-native';
import styles from './styles';
import {Link} from 'react-router-native';
import {IMAGES_URL} from '../../resources/constants/urls';
import ProfileIcon from '../../resources/img/icons/ProfileIcon';
import {BaseText} from '../Text';
import {NestedClient} from '../../interfaces/User';
import {PRIMARY_GREEN} from '../../resources/constants/colors';
import DotMenuIcon from '../../resources/img/icons/DotMenuIcon';

const LinkContainer: React.FC<
  PropsWithChildren<{id: number; shouldRender: boolean; loading: boolean}>
> = ({shouldRender = false, id, loading, children}) => {
  return shouldRender ? (
    <Link
      disabled={loading}
      to={`/terapeutas/${id}`}
      underlayColor={'transparent'}>
      <View style={styles.linkChildrenContainer}>{children}</View>
    </Link>
  ) : (
    <View style={styles.linkChildrenContainer}>{children}</View>
  );
};

const ClientCard: React.FC<{
  client: NestedClient;
  clickable: boolean;
  loading?: boolean;
  options?: {title: string; color?: string; callback: () => void}[];
}> = ({client, clickable = true, loading = false, options = []}) => {
  const [showOptions, setShowOptions] = useState(false);
  const {id, name, lastName, profileImg} = client;
  return (
    <View style={styles.container}>
      <LinkContainer loading={loading} id={id} shouldRender={clickable}>
        <View style={styles.imageContainer}>
          {profileImg ? (
            <Image
              style={styles.image}
              source={{uri: `${IMAGES_URL}${profileImg}`}}
            />
          ) : (
            <ProfileIcon />
          )}
        </View>
        <View style={styles.informationContainer}>
          <BaseText
            fontSize={18}
            marginBottom={5}
            textAlign={'left'}>{`${name} ${lastName}`}</BaseText>
        </View>
        {loading && <ActivityIndicator color={PRIMARY_GREEN} size={22} />}
        {!loading && options.length > 0 && (
          <TouchableHighlight
            style={styles.dotMenuContainer}
            onPress={() => setShowOptions(!showOptions)}>
            <DotMenuIcon />
          </TouchableHighlight>
        )}
        {showOptions && (
          <View style={styles.optionsContainer}>
            {options.map(option => (
              <TouchableHighlight
                key={option.title}
                onPress={() => {
                  setShowOptions(false);
                  option.callback();
                }}>
                <BaseText color={option.color}>{option.title}</BaseText>
              </TouchableHighlight>
            ))}
          </View>
        )}
      </LinkContainer>
    </View>
  );
};

export default ClientCard;
