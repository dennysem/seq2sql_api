import pandas as pd
import re


class GooglePlayDataSource:
    def __init__(self):
        self._load_data()

    @property
    def data_path(self):
        return './seq2sql_api/data_sources/resources/google_play/googleplaystore.csv'

    def _load_data(self):
        self.df = pd.read_csv(self.data_path)
        for column in self. columns_to_filter:
            self.df[column] = self.df[column].str.lower()

    @property
    def columns(self):
        return list(self.df.columns)

    @property
    def dimensions(self):
        return {
            'Genres': ['genre', 'genres'],
            'Type': ['type', 'monetization'],
            'Android Ver': ['android version', 'android ver', 'android'],
            'Content Rating': ['content rating', 'content'],
            'Installs': ['installs', 'user'],
            'Category': ['category'],
            'Price': ['price', 'expensive']
        }

    @property
    def dimension_aliases(self):
        result = {}
        for k, aliases in self.dimensions.items():
            for v in aliases:
                result[v] = k
        return result

    @property
    def columns_to_filter(self):
        return ['Genres', 'Category', 'Content Rating', 'Type']

    @property
    def filter_aliases(self):
        filter_aliases = {}
        for column in self.columns_to_filter:
            values = set(self.df[column])
            for value in values:
                if type(value) is not str:
                    continue
                keys = re.compile("[ &;_]").split(value)
                for key in keys:
                    if len(key) > 3:
                        filter_aliases[key.lower()] = column
        return filter_aliases
