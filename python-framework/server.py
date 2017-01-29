from bottle import response, error, get, request, post, delete, put, HTTPResponse
import json

@get('/items')
def get_items(db):
    db.execute("SELECT * FROM items")
    items = json.dumps(db.fetchall())
    HTTPResponse.content_type = 'application/json'
    return HTTPResponse(status=200, body=items)

@get('/item/<rowid>')
def get_item(db, rowid=0):
  db.execute('SELECT * FROM items WHERE rowid=?', rowid)
  item = json.dumps(db.fetchone())
  return HTTPResponse(status=200, body=item)
  response.content_type = 'application/json charset=utf-8'

@post('/items')
def post_items(db):
  item = json.load(request.body)
  db.execute("""INSERT INTO items (category, date, amount, name, location)
                VALUES (?, ?, ?, ?, ?)""",
             (item['category'], item['date'], item['amount'], item['name'],  item['location']))
  return HTTPResponse(status=201, body=None)

@delete('/item/<rowid>')
def delete_item(db, rowid):
  db.execute("""DELETE FROM items WHERE rowid=?""", (rowid))
  response.content_type = 'application/json'
  return json.dumps({'Success': {'Message':200, 'Status': Request is ok}})

@put('/item/<rowid>')
def put_item(db, rowid):
  db.execute("""SELECT * FROM items WHERE rowid=?""", rowid)
  item = db.fetchone()
  item.update(json.load(request.body))
  db.execute("""UPDATE items SET
                category=?, date=?, amount=?, name=?, location=?
                WHERE rowid=?""",
             (item['category'], item['date'], item['amount'], item['name'], item['location'], rowid))
  response.content_type = 'application/json'
  return HTTPResponse(response.content_type)

@error(404)
def error_404_handler(e):
    response.content_type = 'application/json'
    return json.dumps({'Error': {'Message': e.status_line, 'Status': e.status_code}})

if __name__ == "__main__":
    from bottle import install, run
    from wtplugin import WtDbPlugin, WtCorsPlugin

    install(WtDbPlugin())
    install(WtCorsPlugin())
    run(host='localhost', port=8081, reloader=True, debug=True, autojson=False)
