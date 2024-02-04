import DocumentationStatus from './DocumentationStatus';

interface Documentation {
  id: number;
  therapistId: number;
  documentType: string;
  name: string;
  status: DocumentationStatus;
  comments: null | string;
  createdAt: string;
  uuid: string;
}

export default Documentation;
