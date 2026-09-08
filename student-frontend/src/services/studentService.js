import api from "./api";

export const getStudents = () => {
    return api.get("/students");
};

export const getStudentById = (id) => {
    return api.get(`/students/${id}`);
};

export const addStudent = (student) => {
    return api.post("/students", student);
};

export const updateStudent = (id, student) => {
    return api.put(`/students/${id}`, student);
};

export const deleteStudent = (id) => {
    return api.delete(`/students/${id}`);
};