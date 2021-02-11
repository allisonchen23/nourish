import requests
import json
import psycopg2

# Constants for accessing FDC API
API_KEY = 'pXggN0NWEeqL49apXBpvix2U0vAy4kKcGtJhi2Py'
URL = 'https://api.nal.usda.gov/fdc/v1/foods/search?api_key={}'.format(API_KEY)
DATA = {
    'query': "raw",
    'pageSize': 6000
}

# Constants for accessing PostgreSQL DB
DATABASE = "nourish_db"
USER = "allison"
PASSWORD = "nourish"
HOST = "127.0.0.1"
PORT = "5432"

def create_db():
    print(URL)
    query = requests.post(URL, json=DATA).json()
    print(len(query['foods']))
    print(query['totalPages'])
    food_array = query['foods']
    food_array = [item for item in food_array if "scientificName" in item]
    print(len(food_array))
    with open('FoodDB.json', 'w') as f:
        json.dump(food_array, f, indent=2)

def keep_nutrient(nutrient):

    if nutrient['value'] < 0.05:
        return False
    if ":" in nutrient['nutrientName']:
        return False
    return True


def clean_nutrients(verbose=True):
    nutrient_id_name_mapping = {}
    with open('FoodDB.json') as f:
        data = json.load(f)
        for idx, food_item in enumerate(data):
            nutrients_cleaned = [nutrient for nutrient in food_item['foodNutrients'] if keep_nutrient(nutrient)]
            for nutrient in nutrients_cleaned:
                nutrient_id = nutrient['nutrientId']
                nutrient_name = nutrient['nutrientName']
                nutrient_unit = nutrient['unitName']
                nutrient_id_name_mapping[nutrient_id] = "{} ({})".format(nutrient_name, nutrient_unit)
            
            if verbose and idx % 50 == 0:
                print("Processed {}/{} foods".format(idx+1, len(data)))
            food_item['foodNutrients'] = nutrients_cleaned
        with open('CleanedFoodDB.json', 'w') as cleaned_f:
            json.dump(data, cleaned_f, indent=2)
        with open('NutrientIDNameMapping.json', 'w') as map_f:
            json.dump(nutrient_id_name_mapping, map_f, indent=2)

def connect_to_postgres():
    connection = psycopg2.connect(database=DATABASE,
        user=USER,
        password=PASSWORD,
        host=HOST,
        port=PORT)
    cursor = connection.cursor()
    return (connection, cursor)

def build_postgres_table(table_name="nutrients"):
    connection, cursor = connect_to_postgres()
    cursor.execute('''CREATE TABLE nutrients (
        FOOD VARCHAR(50) PRIMARY KEY NOT NULL,
        n1104 float,
        n1005 float);''')
    connection.commit()
    connection.close()

def add_columns(nutrient_id_map, table_name="nutrients"):
    str = ''''''
    for nutrient_id in nutrient_id_map.keys():
        str += '''ADD COLUMN IF NOT EXISTS n{} float, '''.format(nutrient_id)
    str = str[:-2] + ';'
    print(str)

    connection, cursor = connect_to_postgres()
    cursor.execute('''ALTER TABLE {} {}'''.format(table_name, str))
    connection.commit()
    connection.close()

def insert_food(food_item, table_name="nutrients"):
    food_name = food_item['description']
    nutrients = {}
    headers_str = '{}(food, '.format(table_name)
    values_str = '({}'.format(food_name)
    for nutrient in food_item['foodNutrients']:
        id_num = nutrient['nutrientId']
        amount = nutrient['value']
        # nutrients['n{}'.format(id_num)]
        headers_str += 'n{}, '.format(id_num)
        values_str += '{}, '.format(amount)
    headers_str = headers_str[:-2] + ")"
    values_str = values_str[:-2] + ")"
    print(headers_str)
    print(values_str)

    connection,  cursor = connect_to_postgres()
    cursor.execute('INSERT INTO {} VALUES {};'.format(headers_str, values_str))
    connection.commit()
    connection.close()
if __name__ == '__main__':
    # create_db()
    # clean_nutrients()

    # build_postgres_table()
    # with open('NutrientIDNameMapping.json') as f:
    #     mapping = json.load(f)
    #     add_columns(mapping)

    with open('CleanedFoodDB.json') as f:
        json_db = json.load(f)
        insert_food(json_db[0])