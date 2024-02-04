import React, {useEffect} from 'react';
import Loading from '../../../../../../../components/Loading';
import useRequiredDocumentation from '../../../../../../../state/requiredDocumentation';
import {BaseText} from '../../../../../../../components/Text';
import DocumentationSection from './DocumentationSection';

const RequiredDocumentation: React.FC = () => {
  const {
    data: requiredDocumentation,
    dispatcher: requiredDocumentationDispatcher,
  } = useRequiredDocumentation();

  useEffect(() => {
    requiredDocumentationDispatcher.fetchStart();
  }, [requiredDocumentationDispatcher]);

  return requiredDocumentation.fetching.fetch.isFetching ? (
    <Loading />
  ) : (
    <>
      <BaseText fontSize={18} weight={800} marginTop={4} marginBottom={4}>
        Completa tu registro
      </BaseText>
      <BaseText>
        Envía la documentación que se solicita para comenzar a utilizar Terappy.
      </BaseText>
      {requiredDocumentation.list.map((doc, i) => (
        <DocumentationSection
          key={doc.documentType}
          requiredDocument={doc}
          isInitiallyExpanded={i === 0}
        />
      ))}
    </>
  );
};

export default RequiredDocumentation;
