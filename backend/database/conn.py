import psycopg2 as p2

class Database:
    def __init__(self):
        try:
            self.connection = p2.connect(
                host = 'localhost',
                database = 'postgres',
                user = 'postgres',
                password = 'postgrespw',
                port = '32768'
            )
            self.connection.autocommit = True
            self.cursor = self.connection.cursor()
        except:
            print('cannot connect to database')

    def create_table(self):
        create_table_command = """CREATE TABLE employee (
            id serial primary key,
            fullname varchar(50),
            age int
        )"""
        self.cursor.execute(create_table_command)
        self.connection.close()
        return 'create table success!!'
    
    def qureyDB (self):
        create_table_command = """CREATE TABLE employee (
            id serial primary key,
            fullname varchar(50),
            age int
        )"""
        self.cursor.execute(create_table_command)
        self.connection.close()
        return 'create table success!!'
    

