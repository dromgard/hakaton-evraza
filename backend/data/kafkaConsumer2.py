import json
from kafka import KafkaConsumer # pip3 install kafka-python
import sqlite3
from datetime import datetime

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
# num_messages = 10

con = sqlite3.connect("Exgauster.db")
momentsCount = 0
namesCount = 0
valuesCount = 0
try:
    con.execute("CREATE TABLE moments (timeId, dt, ts)")
    con.execute("CREATE TABLE names (nameId, name)")
    con.execute("CREATE TABLE data (Id, timeId, nameId, value)")
    prints('tables created')
except Exception as e:
    print('we suppose, that tables were created')
    cur = con.execute("SELECT count() FROM moments")
    for row in cur:
        momentsCount = row[0]
    cur = con.execute("SELECT count() FROM names")
    for row in cur:
        namesCount = row[0]
    cur = con.execute("SELECT count() FROM data")
    for row in cur:
        valuesCount = row[0]
    print( momentsCount, namesCount, valuesCount )


for i, message in enumerate(consumer):
    json_message = {}
    with open('outputKafka.json', 'a') as f:
        print(i)
        message = message.value
        json_message = json.loads(message)
        f.write(json.dumps(json_message, indent=4))
        f.write('\n')
    for key, value in json_message.items():
        if key == 'moment':
            momentsCount += 1
            con.execute("INSERT INTO moments VALUES (?, ?, ?)",
                        (momentsCount, value,
                         datetime.fromisoformat(value).timestamp()))
        else:
            cur = con.execute("SELECT nameId FROM names WHERE name == '%s'" % key)
            nameId = None
            for row in cur:
                nameId = row[0]
                break
            if nameId is None:
                # fist row of this type
                namesCount += 1
                nameId = namesCount
                con.execute("INSERT INTO names VALUES(?, ?)", (namesCount, key))
            valuesCount += 1
            con.execute("INSERT INTO data VALUES(?, ?, ?, ?)",
                        (valuesCount, momentsCount, nameId, value))
        con.commit()


