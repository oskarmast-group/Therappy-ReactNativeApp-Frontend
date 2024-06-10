import React, { useMemo, useState } from "react";
import Collapsible from "react-native-collapsible";
import { Pressable, View } from "react-native";
import styles from "./styles";
import Chevron from "./Chevron";
import Document from "./Document";
import DocumentUpload from "./DocumentUpload";
import { BaseText } from "../../../../../../../components/Text";
import { useAuth } from "../../../../../../../context/Auth";
import UserType from "../../../../../../../types/User/UserType";
import RequiredDocumentation from "../../../../../../../types/Documentation/RequiredDocumentation";

const DocumentationSection: React.FC<{
  requiredDocument: RequiredDocumentation;
  isInitiallyExpanded: boolean;
}> = ({ requiredDocument, isInitiallyExpanded = true }) => {
  const [isExpanded, setExpanded] = useState(isInitiallyExpanded);
  const { user } = useAuth();

  const documents = useMemo(() => {
    if (!user || user.userType !== UserType.THERAPIST) {
      return [];
    }
    if (
      !user?.extraData?.documentation ||
      !Array.isArray(user.extraData?.documentation)
    ) {
      return [];
    }
    const docs = user.extraData.documentation.filter(
      ({ documentType }) => documentType === requiredDocument.documentType
    );
    return docs;
  }, [user, requiredDocument]);

  return (
    <View style={styles.container}>
      <Pressable style={styles.header} onPress={() => setExpanded(!isExpanded)}>
        <BaseText weight={700}>{`${requiredDocument.title} ${
          requiredDocument.isRequired ? "" : "(opcional)"
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
