"""
6. Accept a 5 digit decimal number as input and display the number in reverse order.
(Example: if input is 12345, then output must be 54321)
"""

def reverseNumber(number):
    reverseNum=0;
    while(number>0):
        digit=number%10
        reverseNum=reverseNum*10+digit
        number=number//10

    return reverseNum
    

number=int(input("Enter the number to reverse: \n"))
print(reverseNumber(number))
