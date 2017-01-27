from bottle import response, error, get, request, post
import json

@get('/items')
def items(db):
    db.execute("SELECT * FROM items")
    names = db.fetchall()
    return json.dumps(names)

@get('/items/<rowid>')
def getOne(db, rowid=0):
  db.execute('SELECT * FROM items WHERE rowid=?', rowid)
  name = db.fetchone()
  return json.dumps(name)

@post('/items')
def insert(db):
  item = json.load(request.body)
  db.execute("""INSERT INTO items (category, date, amount, name, location)
                VALUES (?, ?, ?, ?, ?)""",
             (item['category'], item['date'], item['amount'], item['name'],  item['location']))
  response.content_type = 'application/json'
  return json.dumps(response.content_type)

@error(404)
def error_404_handler(e):

    # Content type must be set manually in error handlers
    response.content_type = 'application/json'

    return json.dumps({'Error': {'Message': e.status_line, 'Status': e.status_code}})

if __name__ == "__main__":
    from bottle import install, run
    from wtplugin import WtDbPlugin, WtCorsPlugin

    install(WtDbPlugin())
    install(WtCorsPlugin())
    run(host='localhost', port=8081, reloader=True, debug=True, autojson=False)
