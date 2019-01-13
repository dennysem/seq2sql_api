class EntityExtractor:

    def __init__(self, data_source):
        self.data_source = data_source

    def extract(self, query):
        query = query.lower()
        aggregation = self._extract_aggregation(query)
        dimensions = self._extract_dimensions(query)
        filters = self._extract_filters(query)
        return aggregation, dimensions, filters

    def _extract_dimensions(self, query):
        dimensions = set()
        dimension_aliases = self.data_source.dimension_aliases
        for alias, dimension in dimension_aliases.items():
            if alias in query:
                dimensions.add(dimension)
        return list(dimensions)

    def _extract_aggregation(self, query):
        if query == 'all apps':
            return 'all'
        elif 'rating' in query:
            return 'mean'
        else:
            return 'count'

    def _extract_filters(self, query):
        filters = set()
        filter_aliases = self.data_source.filter_aliases
        for alias, dimension in filter_aliases.items():
            if alias in query:
                filters.add((dimension, alias))
        return list(filters)
