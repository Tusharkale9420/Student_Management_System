package org.tushar.studentmanagement.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.tushar.studentmanagement.entity.Student;

public interface StudentRepository extends JpaRepository<Student, Long> {

}