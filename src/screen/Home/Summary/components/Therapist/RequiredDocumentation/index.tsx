import React, { useEffect } from "react";
import DocumentationSection from "./DocumentationSection";
import Loading from "../../../../../../components/Loading";
import { BaseText } from "../../../../../../components/Text";

const RequiredDocumentation: React.FC = () => {
  // const { data: requiredDocumentation, dispatcher: requiredDocumentationDispatcher } = useRequiredDocumentation();
  const requiredDocumentation = {
    fetching: { fetch: { isFetching: true } },
    list: [],
  };
  // useEffect(() => {
  //   requiredDocumentationDispatcher.fetchStart();
  // }, [requiredDocumentationDispatcher]);

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
