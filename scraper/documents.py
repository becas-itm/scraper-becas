import os
import uuid

from elasticsearch_dsl.connections import create_connection
from elasticsearch_dsl import Document, Text, Date, Object, Keyword


class RawScholarship(Document):
    class Index:
        name = 'raw_scholarships'

    name = Text(required=True)

    description = Text()

    deadline = Text()

    fundingType = Text()

    spider = Object(
        required=True,
        properties={
            'name': Keyword(required=True),
            'extractedAt': Date(required=True),
        },
    )

    sourceDetails = Object(
        properties={
            'id': Text(),
            'url': Keyword(required=True),
        },
    )

    country = Text()

    language = Keyword()

    @staticmethod
    def create(item):
        scholarship = RawScholarship(meta={'id': str(uuid.uuid4())}, **item)
        scholarship.save()


def connect_db():
    host = os.getenv('ELASTIC_HOST', '127.0.0.1')
    return create_connection(alias='default', hosts=[host])


def init_indexes():
    connect_db()
    RawScholarship.init()


if __name__ == '__main__':
    init_indexes()
