"""
3. An employee is considered for on-site depending on these conditions
(i) An employee Should have Passport
(ii) Communication should be good
(iii) His training feedback should be good
(iv) Should be at-least 2years experienced.
(v) Age should be greater than or equal to 23.
Using above conditions, check if an employee is eligible to go to on-site or not.
"""

def getEmployeeOnsite(passportStatus,communicationStatus,feedback,experience,age):
    if(passportStatus=="yes" communicationStatus=="good" && feedback=="good" && experience>2 && age>=23):
        print("Employee is eligible to go to on-site")
    else:
        print("Employee is not eligible to go to on-site")


passportStatus=input("Enter passportStatus: \n")
communicationStatus=input("Enter communicationStatus: \n")
feedback=input("Enter feedback: \n")
experience=input("Enter experience: \n")
age=input("Enter the Age: \n")

getEmployeeOnsite(passportStatus,communicationStatus,feedback,experience,age)
