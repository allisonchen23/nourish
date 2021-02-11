import requests
import json
API_KEY = 'pXggN0NWEeqL49apXBpvix2U0vAy4kKcGtJhi2Py'

URL = 'https://api.nal.usda.gov/fdc/v1/foods/search?api_key={}'.format(API_KEY)

DATA = {
    'query': "raw",
    'pageSize': 6000
}
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
                nutrient_unit = nutrient
                nutrient_id_name_mapping[nutrient_id] = nutrient_name
            
            if verbose and idx % 50 == 0:
                print("Processed {}/{} foods".format(idx+1, len(data)))
            food_item['foodNutrients'] = nutrients_cleaned
        with open('CleanedFoodDB.json', 'w') as cleaned_f:
            json.dump(data, cleaned_f, indent=2)
        with open('NutrientIDNameMapping.json', 'w') as map_f:
            json.dump(nutrient_id_name_mapping, map_f, indent=2)

def build_postgres_db():

if __name__ == '__main__':
    # create_db()
    # clean_nutrients()