select Students.Name,Students.USN,Students.Section,one.GPA,two.GPA,three.GPA,four.GPA,five.GPA,six.GPA 
    from gpa.Students left OUTER join gpa.one on Students.USN = one.USN 
    left OUTER join gpa.two on Students.USN = two.USN 
    left OUTER join gpa.three on Students.USN = three.USN 
    left OUTER join gpa.four on Students.USN = four.USN 
    left OUTER join gpa.five on Students.USN = five.USN 
    left OUTER join gpa.six on Students.USN = six.USN
