import React from 'react';
import useRequiredDocumentation from '../../../../../../../../../state/requiredDocumentation';
import {ActivityIndicator, TouchableOpacity, View} from 'react-native';
import styles from './styles';
import FileIcon from '../../../../../../../../../resources/img/icons/FileIcon';
import {BaseText} from '../../../../../../../../../components/Text';
import FileUploadIcon from '../../../../../../../../../resources/img/icons/FileUploadIcon';
import {FunctionModes, useDocumentUpload} from '../useDocumentUpload';

const DocumentUpload: React.FC<{documentType: string}> = ({documentType}) => {
  const {data: requiredDocumentation} = useRequiredDocumentation();

  const onUpload = useDocumentUpload({
    type: FunctionModes.NEW,
    documentType,
  });

  return requiredDocumentation?.fetching?.upload?.isFetching &&
    requiredDocumentation?.fetching?.upload?.config?.key === 'newdoc' ? (
    <View style={styles.documentContainer}>
      <View style={styles.fileContainer}>
        <FileIcon />
      </View>
      <View style={styles.loaderContainer}>
        <ActivityIndicator color={'white'} />
      </View>
      {requiredDocumentation?.fetching?.upload?.config?.name && (
        <BaseText
          fontSize={12}
          marginLeft={2}
          marginRight={2}
          numberOfLines={1}
          style={styles.documentName}>
          {requiredDocumentation?.fetching?.upload?.config?.name}
        </BaseText>
      )}
    </View>
  ) : (
    <TouchableOpacity style={styles.uploadContainer} onPress={onUpload}>
      <View style={styles.fileContainer}>
        <FileUploadIcon />
      </View>
    </TouchableOpacity>
  );
};

export default DocumentUpload;
