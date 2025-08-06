package main

import (
	"errors"
	"fmt"
)

type Student struct {
	ID    string  `json:"id"`
	Name  string  `json:"name"`
	Email string  `json:"email"`
	Year  int     `json:"year"`
	GPA   float64 `json:"gpa"`
}

func (s *Student) IsHonor() bool {
	return s.GPA >= 3.50
}

func (s *Student) Validate() error {
	if s.Name == "" {
		return errors.New("name is required")
	}
	if s.Year < 1 || s.Year > 4 {
		return errors.New("year must be between 1-4")
	}
	if s.GPA < 0 || s.GPA > 4 {
		return errors.New("gpa must be between 0-4")
	}
	return nil
}

func main() {
	//var st Student = Student{ID: "1", Name: "yanika", Email: "moonpuak_y@silpakorn.edu", Year: 4, GPA: 3.75}
	//st := Student = Student{ID: "1", Name: "yanika", Email: "moonpuak_y@silpakorn.edu", Year: 4, GPA: 3.75}
	students := []Student{
		{ID: "1", Name: "yanika", Email: "moonpuak_y@silpakorn.edu", Year: 4, GPA: 3.75},
		{ID: "2", Name: "sasithon", Email: "kitcharoen_s2@silpakorn.edu", Year: 4, GPA: 3.75},
	}

	newStudent := Student{ID: "3", Name: "judy", Email: "judy_m@silpakorn.edu", Year: 4, GPA: 3.55}
	students = append(students, newStudent)

	for i, student := range students {
		fmt.Printf("%d Honor = %v\n", i, student.IsHonor())
		fmt.Printf("%d Validation = %v\n", i, student.Validate())
	}
	//fmt.Printf("Honor = %v\n", st.IsHonor())
	//fmt.Printf("Validation = %v\n", st.Validate())
}
