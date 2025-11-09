# import matplotlib.pyplot as plt

# # Revenue data (billions USD)
# years = [2019, 2020, 2021, 2022, 2023]

# google = [161.857, 182.527, 257.637, 282.836, 307.394]   # Alphabet revenue
# amazon = [280.5, 386.1, 469.8, 514.0, 574.8]            # Amazon revenue
# meta = [70.7, 86.0, 117.9, 116.6, 134.9]                # Meta (Facebook) revenue
# openai = [0.03, 0.02, 0.2, 1.6, 3.0]                    # OpenAI (estimated)

# plt.figure(figsize=(10,5))

# plt.plot(years, google,color="red", label="Google (Alphabet)")
# plt.plot(years, amazon,color="green", label="Amazon")
# plt.plot(years, meta,color="blue", label="Meta (Facebook)")
# plt.plot(years, openai,color="black", label="OpenAI")

# plt.xlabel("Year")
# plt.ylabel("Revenue (Billions USD)")
# plt.title("Revenue Growth Comparison (Google vs Amazon vs Meta vs OpenAI)")
# plt.grid(True)
# plt.legend()

# plt.show()


import numpy as np
import matplotlib.pyplot as plt

# Time (like days/months/years of the relationship)
time = np.linspace(0, 10, 100)

# Love growth curve (exponential)
love_growth = np.exp(time / 3)

plt.figure(figsize=(10,5))
plt.plot(time, love_growth, color="red", linewidth=3)

plt.title("Love Growth: You ❤️ Snigdha", fontsize=18)
plt.xlabel("Time Together", fontsize=14)
plt.ylabel("Love Level", fontsize=14)
plt.grid(True)

plt.text(5, max(love_growth)/2, "Love keeps growing ❤️", fontsize=12)

plt.show()
