import pandas as pd
import json

menus = ['northmess.xlsx', 'kadamba.xlsx', 'southmess.xlsx', 'yuktahar.xlsx']
dfs = [pd.read_excel('./excel_menu/' + menu) for menu in menus]    

# Remove Column with all NaN values
dfs = [df.dropna(axis=1, how='all') for df in dfs]
# Remove Row with all NaN values
dfs = [df.dropna(axis=0, how='all') for df in dfs]

# Meal Replace all NaN with the value above it
# dfs = [df.fillna(method='ffill') for df in dfs]
# Do the above only on the first column 'Meal'
for i in range(len(dfs)):
    dfs[i]['Meal'] = dfs[i]['Meal'].fillna(method='ffill')

# Replace all NaN with empty string
dfs = [df.fillna('') for df in dfs]

days = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday']
meals = ['Breakfast', 'Lunch', 'Snack', 'Dinner']

mess_menus = {}

# for each menu
for i in range(0, len(menus)):
    df = dfs[i]
    menu = menus[i]
    mess_menu = {
        'Days': {},
        'lastUpdated': '02/09/2024',
        'wef': '01/09/2024',
        'additionalInfo': []
        }

    # for each row
    for i in range(0, len(df)):
        row = df.iloc[i]
        for day in days:
            if day not in mess_menu['Days']:
                mess_menu['Days'][day] = {}
            if row['Meal'] not in mess_menu['Days'][day]:
                mess_menu['Days'][day][row['Meal']] = {}
            mess_menu['Days'][day][row['Meal']][row['Items']] = row[day]

    mess_menus[menu] = mess_menu

# Save each to json
for menu in mess_menus:
    with open('src/menus/' + menu.split('.')[0] + '.json', 'w') as fp:
        json.dump(mess_menus[menu], fp, indent=4)