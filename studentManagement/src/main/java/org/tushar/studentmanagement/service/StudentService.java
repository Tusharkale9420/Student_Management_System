package org.tushar.studentmanagement.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import org.tushar.studentmanagement.entity.Student;
import org.tushar.studentmanagement.exception.ResourceNotFoundException;
import org.tushar.studentmanagement.repository.StudentRepository;

import java.util.List;

@Service
public class StudentService {

    @Autowired
    private StudentRepository studentRepository;

    // Get all students
    public List<Student> getAllStudents() {
        return studentRepository.findAll();
    }

    // Get student by ID
    public Student getStudentById(Long id) {

        return studentRepository.findById(id)
                .orElseThrow(() ->
                        new ResourceNotFoundException(
                                "Student not found with id: " + id
                        )
                );
    }

    // Add student
    public Student saveStudent(Student student) {

        long count = studentRepository.count();

        student.setStudentNumber((int) count + 1);

        return studentRepository.save(student);
    }

    // Update student
    public Student updateStudent(Long id, Student student) {

        Student existingStudent = studentRepository.findById(id)
                .orElseThrow(() ->
                        new ResourceNotFoundException(
                                "Student not found with id: " + id
                        )
                );

        existingStudent.setName(student.getName());
        existingStudent.setEmail(student.getEmail());
        existingStudent.setCourse(student.getCourse());

        return studentRepository.save(existingStudent);
    }

    // Delete student
    public void deleteStudent(Long id) {

        Student existingStudent = studentRepository.findById(id)
                .orElseThrow(() ->
                        new ResourceNotFoundException(
                                "Student not found with id: " + id
                        )
                );

        studentRepository.delete(existingStudent);

        List<Student> students = studentRepository.findAll();

        students.sort((a, b) -> a.getId().compareTo(b.getId()));

        int number = 1;

        for (Student student : students) {
            student.setStudentNumber(number++);
        }

        studentRepository.saveAll(students);
    }
}