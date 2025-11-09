sign = input("Enter a character: ")

print()

print(" " * 30 + sign * 8)

for i in range(1, 28):

    if i < 4:
        print(" " * (30 - (i + 1)) + sign * (2 * i + 10))

    elif i < 21:
        print(" " * 26 + sign * 16)

    else:  # i >= 21 and i < 28
        if i == 21:
            print(" " * 20 + sign * 28)

        elif 22 < i <= 25:
            print(" " * 15 + sign * 38)

        elif i == 27:
            print(" " * 20 + sign * 13 + " " + sign * 13)

        else:
            print(" " * 16 + sign * 36)
