export type Department = {
  id: string;
  name: string;
  parent: Department | null;
  height: number;
  nameOfDepartment: string;
  programmingLanguage: string | null;
};

export type Company = {
  departments: Department[];
};

export type AddNodeBody = {
  name: string;
  parentId: string | null;
  nameOfDepartment: string;
  programmingLanguage: string | null;
};

export type UpdateParentBody = {
  departmentId: string;
  newParentId: string;
};
