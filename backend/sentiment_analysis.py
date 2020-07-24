# Imports the Google Cloud client library
from google.cloud import language
from google.cloud.language import enums
from google.cloud.language import types
import os
print(os.environ)
del os.environ['COMMAND_MODE']
print(os.environ)
# Instantiates a client
client = language.LanguageServiceClient()

text1 = 'I love this'


def get_sentiment(text):
    print('Line 14', text, 'type: ', type(text))
    document = types.Document(content=text, type=enums.Document.Type.PLAIN_TEXT)
    print('line 16', document)
    sentiment = client.analyze_sentiment(document=document).document_sentiment
    print('line 18', sentiment)
    return sentiment

print(get_sentiment(text1))
