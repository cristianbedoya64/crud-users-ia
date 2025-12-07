import psycopg2
from dotenv import load_dotenv
import os

load_dotenv()

conn = psycopg2.connect(
    dbname=os.getenv('POSTGRES_DB'),
    user=os.getenv('POSTGRES_USER'),
    password=os.getenv('POSTGRES_PASSWORD'),
    host=os.getenv('POSTGRES_HOST'),
    port=os.getenv('POSTGRES_PORT')
)
cur = conn.cursor()

for table in ['users', 'roles', 'user_roles']:
    try:
        cur.execute(f'SELECT COUNT(*) FROM {table};')
        count = cur.fetchone()[0]
        print(f'Tabla {table}: {count} registros')
    except Exception as e:
        print(f'Error consultando {table}:', e)

cur.close()
conn.close()
