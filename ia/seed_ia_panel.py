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

# Insertar roles
cur.execute("INSERT INTO roles (name) VALUES ('admin'), ('user') ON CONFLICT DO NOTHING;")

# Insertar usuarios
cur.execute("INSERT INTO users (name, email) VALUES ('Juan Perez', 'juan@demo.com'), ('Ana Ruiz', 'ana@demo.com') ON CONFLICT DO NOTHING;")

# Obtener IDs
cur.execute("SELECT id FROM users WHERE email='juan@demo.com';")
juan_id = cur.fetchone()[0]
cur.execute("SELECT id FROM users WHERE email='ana@demo.com';")
ana_id = cur.fetchone()[0]
cur.execute("SELECT id FROM roles WHERE name='admin';")
admin_id = cur.fetchone()[0]
cur.execute("SELECT id FROM roles WHERE name='user';")
user_id = cur.fetchone()[0]

# Asignar roles a usuarios
cur.execute("INSERT INTO user_roles (user_id, role_id) VALUES (%s, %s), (%s, %s) ON CONFLICT DO NOTHING;", (juan_id, admin_id, ana_id, user_id))

conn.commit()
cur.close()
conn.close()
print('Datos de prueba insertados correctamente.')
