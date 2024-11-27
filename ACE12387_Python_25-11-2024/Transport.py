"""
2. Implement the following logic to select the mode of transport for dispatching Pet animals from our
"Pet shop" (DO NOT use logical operators)
a) If priority is not urgent and the weight is less than or equal to 5 Kg, dispatch by Bike.
b) If priority is not urgent and the weight is more than 5 Kg, select a lorry if the distance is less
Than or equal to 250 Km.
c) If the priority is urgent and distance is less than 50 Km and weight is less than 100 Kg,
Select a van
d) In all other cases, use a train
"""
def getModeOfTransport(priorityRange,distance,weight):
    if(priorityRange=="not urgent"):
        if weight<=5:
            print("Dispatch by Bike")
        elif weight>5:
            if(distance<=250):
                print("Dispatch by Lorry")
            else:
                print("Dispatch not available")
    elif(priorityRange=="urgent"):
        if distance<50:
            if weight<100:
                print("Dispatch by Van")
        else:
            print("Dispatch not available")
    else:
        print("Dispacth by train")

priorityRange=input("Enter priorityRange: \n")
distance=input("Enter distance: \n")
weight=input("Enter weight: \n")

getModeOfTransport(priorityRange,distance,weight)
