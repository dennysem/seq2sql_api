import json


class DataLoader:
    def __init__(self, data_source):
        self.data_source = data_source
        self.df = self.data_source.df

    def load(self, aggregation='count', dimensions=[], filters=[]):
        resp = self.df
        if filters:
            for filter in filters:
                resp = resp[resp[filter[0]].str.contains(filter[1])]
        if dimensions:
            resp = resp.groupby(by=dimensions, as_index=False).mean()
        return json.loads(resp.to_json(orient='records'))