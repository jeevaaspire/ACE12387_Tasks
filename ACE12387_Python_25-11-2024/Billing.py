"""
1. Calculate the discount applicable for "Pet shop" customers

a) If the customer is a Premium member then 20% discount is applicable on total bill value.
b) If the customer is a Gold member then 15% discount is applicable on total bill value.
c) If the customer is a Silver member then 10% discount is applicable on total bill value.
d) For all other customers the discount will be 5% of their total bill valued over 2000.
"""

def getDiscount(membership,totalBill):
    if(membership=="Premium member"):
        discount=(totalBill*(20/100))
        discount=totalBill-discount
        print("Discount rate for "+membership+" is",discount)
    elif(membership=="Gold member"):
        discount=(totalBill*(15/100))
        discount=totalBill-discount
        print("Discount rate for "+membership+" is",discount)
    elif(membership=="Silver member"):
        discount=(totalBill*(10/100))
        discount=totalBill-discount
        print("Discount rate for "+membership+" is",discount)
    elif(totalBill>2000):
        discount=(totalBill*(5/100))
        discount=totalBill-discount
        print("Discount rate for "+membership+" is",discount)
    else:
        print("Discount not applicable")

membership=input("Enter your membership Details \n")
totalBill=int(input("Enter Totalbill Amount \n"))
getDiscount(membership,totalBill)
