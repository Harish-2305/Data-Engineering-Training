import pandas as pd


df=pd.read_csv('employees.csv')

print('CSV Read:\n',df)

df.to_csv("Updates_employees.csv",index=False)
print("CSV written to updated_employees.csv")

import json

with open('data.json', 'r') as f:
    data=json.load(f)

print("Json Read:\n",data)

with open('output.json', 'w') as f:
    json.dump(data,f,indent=4)

print("Json written to output.json")