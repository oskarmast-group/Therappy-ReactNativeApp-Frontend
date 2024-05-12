import React, { useMemo, useState } from 'react';
import RequiredDocumentation from '../../../../../../../../interfaces/Documentation/RequiredDocumentation';
import Collapsible from 'react-native-collapsible';
import { Pressable, View } from 'react-native';
import styles from './styles';
import useUser from '../../../../../../../../state/user';
import UserType from '../../../../../../../../interfaces/User/UserType';
import Chevron from './Chevron';
import { BaseText } from '../../../../../../../../components/Text';
import Document from './Document';
import DocumentUpload from './DocumentUpload';

const DocumentationSection: React.FC<{
  requiredDocument: RequiredDocumentation;
  isInitiallyExpanded: boolean;
}> = ({ requiredDocument, isInitiallyExpanded = true }) => {
  const [isExpanded, setExpanded] = useState(isInitiallyExpanded);
  const { data: user } = useUser();

  const documents = useMemo(() => {
    if (!user.current || user.current.userType !== UserType.THERAPIST) {
      return [];
    }
    if (!user.current?.extraData?.documentation || !Array.isArray(user.current.extraData?.documentation)) {
      return [];
    }
    const docs = user.current.extraData.documentation.filter(
      ({ documentType }) => documentType === requiredDocument.documentType,
    );
    return docs;
  }, [user, requiredDocument]);

  return (
    <View style={styles.container}>
      <Pressable style={styles.header} onPress={() => setExpanded(!isExpanded)}>
        <BaseText weight={700}>{`${requiredDocument.title} ${
          requiredDocument.isRequired ? '' : '(opcional)'
        }`}</BaseText>
        <Chevron open={isExpanded} />
      </Pressable>
      <Collapsible collapsed={!isExpanded} style={styles.collapseContainer}>
        <BaseText fontSize={12}>{requiredDocument.description}</BaseText>
        <View style={styles.documentsContainer}>
          {documents.map((document) => (
            <Document key={document.uuid} document={document} />
          ))}
          <DocumentUpload documentType={requiredDocument.documentType} />
        </View>
      </Collapsible>
    </View>
  );
};

export default DocumentationSection;
