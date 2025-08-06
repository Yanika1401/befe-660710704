package main

import (
	"fmt"
)

func main() {
	//var name string = "yanika"
	var age int = 20

	email := "moonpuak_y@silpakorn.edu"
	gpa := 3.75

	firstname, lastname := "yanika", "moonpuak"

	fmt.Printf("Name %s %s, age %d, email %s, gpa %.2f\n", firstname, lastname, age, email, gpa)
}
