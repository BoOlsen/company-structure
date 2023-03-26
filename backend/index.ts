import Fastify, { FastifyRequest } from "fastify";
import { AddNodeBody, Company, Department, UpdateParentBody } from "./types";
import uniqueId from "lodash/uniqueId";

const company: Company = {
  departments: [],
};

const fastify = Fastify({
  logger: true,
});

fastify.post(
  "/add-node",
  function (
    request: FastifyRequest<{
      Body: string;
    }>,
    reply
  ) {
    const body: AddNodeBody = JSON.parse(request.body);

    if (!body || body.name == "" || body.nameOfDepartment == "") {
      throw new Error("Department has to have name and name of department");
    }

    let parentDepartment: Department | undefined;
    if (body.parentId) {
      parentDepartment = company.departments.find(
        (department) => department.id === body.parentId
      );
    }

    // We add the new department but remove the parent of the child to avoid having many nested objects
    company.departments.push({
      id: uniqueId(),
      height: parentDepartment ? parentDepartment.height + 1 : 0,
      parent: parentDepartment
        ? {
            ...parentDepartment,
            parent: null,
          }
        : null,
      name: body.name,
      nameOfDepartment: body.nameOfDepartment,
      programmingLanguage: body.programmingLanguage,
    });

    reply.send(company);
  }
);

fastify.get(
  "/get-children/:departmentId",
  function (
    request: FastifyRequest<{
      Params: {
        departmentId: string;
      };
    }>,
    reply
  ) {
    const { departmentId } = request.params;
    if (!departmentId || departmentId == "") {
      throw new Error("No department specified");
    }

    const departments: Department[] = company.departments.filter(
      (department) => department.parent && department.parent.id === departmentId
    );

    reply.send({ Departments: departments });
  }
);

fastify.put(
  "/update-parent",
  function (
    request: FastifyRequest<{
      Body: string;
    }>,
    reply
  ) {
    const body: UpdateParentBody = JSON.parse(request.body);

    if (!body || body.departmentId == "" || body.newParentId == "") {
      throw new Error("Department id and new parent Id has to be specified");
    }

    const department = company.departments.find(
      (department) => department.id === body.departmentId
    );
    const newParentDepartment = company.departments.find(
      (department) => department.id === body.newParentId
    );

    // We update the parent but remove the parent of the child to avoid having many nested objects
    if (department && newParentDepartment) {
      department.height = newParentDepartment.height + 1;
      department.parent = {
        ...newParentDepartment,
        parent: null,
      };
    }

    reply.send(company);
  }
);

// Run the server!
fastify.listen({ port: 3000 }, function (err, address) {
  if (err) {
    fastify.log.error(err);
    process.exit(1);
  }
});
