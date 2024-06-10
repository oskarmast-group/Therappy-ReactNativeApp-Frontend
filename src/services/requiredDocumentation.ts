import RequiredDocumentation from "../types/Documentation/RequiredDocumentation";
import api from "./api";

const getAllRequiredDocumentation = async (): Promise<
  RequiredDocumentation[]
> => {
  const response = await api.get<RequiredDocumentation[]>(
    "/required-documentation"
  );
  return response.data;
};

export { getAllRequiredDocumentation };
