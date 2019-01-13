from django.shortcuts import render
from rest_framework import views
from rest_framework.response import Response
from parse_api.data_sources.google_play import GooglePlayDataSource
from parse_api.data_sources.data_loader import DataLoader
from parse_api.nlp.entity_extraction import EntityExtractor


class ParseRequest(views.APIView):
    def post(self, request):
        data_source_name = request.data.get('data_source', 'google_play')
        query = request.data.get('query', 'by genres')
        max_lines = request.data.get('max_lines', 36)
        if data_source_name == 'google_play':
            data_source = GooglePlayDataSource()
        else:
            data_source = GooglePlayDataSource()

        entity_extractor = EntityExtractor(data_source=data_source)
        aggregation, dimensions, filters = entity_extractor.extract(query=query)

        data_loader = DataLoader(data_source=data_source)
        data = data_loader.load(aggregation=aggregation, dimensions=dimensions, filters=filters)[:max_lines]

        return Response(
            {
                'rows': data,
                'parsing_results': {
                    'aggregation': aggregation,
                    'dimensions': dimensions,
                    'filters': filters,
                }
            }
        )

