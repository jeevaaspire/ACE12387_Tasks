"""
4. Calculate electricity bill for following constraints.
(i) If units exceeds 1000, then charge Rs.10/- per unit.
(ii) If units exceeds 500, then charge Rs.5/- per unit.
(iii) If units exceeds 200, then charge Rs.2/- per unit.
(iv) In other cases charge Rs.1/- per unit.
"""

def getElectricityBill(units):
    if(units>1000):
        charge=units*10
    elif(units>500 and units<1000):
        charge=units*5
    elif(units>200 and units<500):
        charge=units*2
    else:
        charge=units*1
    return charge

units=int(input("Enter unit of Electricty: \n"))
print("Electricity Bill: ",getElectricityBill(units))
