import json
from kafka import KafkaConsumer

# Создание консьюмера с заданными параметрами аутентификации и шифрования
consumer = KafkaConsumer(
    'zsmk-9433-dev-01',
    bootstrap_servers=['rc1a-b5e65f36lm3an1d5.mdb.yandexcloud.net:9091'],
    security_protocol='SASL_SSL',
    sasl_mechanism='SCRAM-SHA-512',
    sasl_plain_username='9433_reader',
    sasl_plain_password='eUIpgWu0PWTJaTrjhjQD3.hoyhntiK',
    ssl_cafile='cert.pem'
)

# Ограничение на количество сообщений
num_messages = -1

with open('outputKafka.json', 'w') as f:
    for i, message in enumerate(consumer):
        if i == num_messages:
            break
        message = message.value
        json_message = json.loads(message)
        f.write(json.dumps(json_message, indent=4))
        f.write('\n')
