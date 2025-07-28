import pandas as pd
import numpy as np

# # Sample raw data (intentionally messy)
# raw_data = {
#     'EmpID': [201, 202, 203, 204, 205, 206],
#     'Name': ['Aarav', 'Sanya', None, 'Karthik', 'Meera', None],  # Missing names
#     'Age': [24, np.nan, 29, 22, 31, np.nan],                    # Missing ages
#     'Department': ['Finance', 'Tech', 'HR', None, 'Marketing', None],  # Missing departments
#     'Salary': ['52000', '73000', 'not available', '48000', '61000', None]  # Invalid and missing salary
# }
#
# # converting the raw data to the data frames
#
# df=pd.DataFrame(raw_data)
# print("Raw data:\n",df)
#
# # cleaning the data
#
# df['Name']=df['Name'].fillna("Unknown")
#
# df['Department']=df['Department'].fillna("Not Assigned")
#
# df['Salary']=pd.to_numeric(df['Salary'],errors='coerce')
#
# df['Salary']=df['Salary'].fillna(df['Salary'].mean())
# df['Age']=df['Age'].fillna(df['Age'].mean())
#
# print("Cleaned data:\n",df)




