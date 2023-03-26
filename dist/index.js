"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const fastify_1 = __importDefault(require("fastify"));
const uniqueId_1 = __importDefault(require("lodash/uniqueId"));
const company = {
    departments: [],
};
const fastify = (0, fastify_1.default)({
    logger: true,
});
fastify.post("/add-node", function (request, reply) {
    const body = JSON.parse(request.body);
    if (!body || body.name == "" || body.nameOfDepartment == "") {
        throw new Error("Department has to have name and name of department");
    }
    let parentDepartment;
    if (body.parentId) {
        parentDepartment = company.departments.find((department) => department.id === body.parentId);
    }
    company.departments.push({
        id: (0, uniqueId_1.default)(),
        height: parentDepartment ? parentDepartment.height + 1 : 0,
        parent: parentDepartment
            ? Object.assign(Object.assign({}, parentDepartment), { parent: null }) : null,
        name: body.name,
        nameOfDepartment: body.nameOfDepartment,
        programmingLanguage: body.programmingLanguage,
    });
    reply.send(company);
});
fastify.get("/get-children/:departmentId", function (request, reply) {
    const { departmentId } = request.params;
    if (!departmentId || departmentId == "") {
        throw new Error("No department specified");
    }
    const departments = company.departments.filter((department) => department.parent && department.parent.id === departmentId);
    reply.send({ Departments: departments });
});
fastify.put("/update-parent", function (request, reply) {
    const body = JSON.parse(request.body);
    if (!body || body.departmentId == "" || body.newParentId == "") {
        throw new Error("Department id and new parent Id has to be specified");
    }
    const department = company.departments.find((department) => department.id === body.departmentId);
    const newParentDepartment = company.departments.find((department) => department.id === body.newParentId);
    if (department && newParentDepartment) {
        department.height = newParentDepartment.height + 1;
        department.parent = Object.assign(Object.assign({}, newParentDepartment), { parent: null });
    }
    reply.send(company);
});
// Run the server!
fastify.listen({ port: 3000 }, function (err, address) {
    if (err) {
        fastify.log.error(err);
        process.exit(1);
    }
});
