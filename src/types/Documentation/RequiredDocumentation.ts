interface RequiredDocumentation {
  id: number;
  documentType: string;
  isRequired: 1 | 0;
  minimumCount: number;
  title: string;
  description: string;
}

export default RequiredDocumentation;
