from bottle import response, error, get, request, post, delete, put, HTTPResponse
import json

@get('/items')
def get_items(db):
  db.execute('SELECT rowid, category, date, amount, name, location FROM items')
  items = json.dumps(db.fetchall())
  return createResponse(200, items)

@get('/item/<rowid>')
def get_item(db, rowid=0):
  db.execute('SELECT rowid, category, date, amount, name, location FROM items WHERE rowid=?', (rowid,))
  item = json.dumps(db.fetchone())
  if item == 'null':
    return createResponse(404, '{"error": "item not found"}')
  return createResponse(200, item)

@post('/items')
def post_items(db):
  item = json.load(request.body)
  db.execute('INSERT INTO items (category, date, amount, name, location) VALUES (?, ?, ?, ?, ?)',
             (item['category'], item['date'], item['amount'], item['name'],  item['location']))
  return createResponse(status=201, body=None)

@delete('/item/<rowid>')
def delete_item(db, rowid):
  db.execute('SELECT * FROM items WHERE rowid=?', (rowid,))
  item = json.dumps(db.fetchone())
  if item == 'null':
    return createResponse(404, '{"error": "item not found"}')
  db.execute('DELETE FROM items WHERE rowid=?', (rowid,))
  return createResponse(200, item)

@put('/item/<rowid>')
def put_item(db, rowid):
  db.execute('UPDATE items SET category=?, date=?, amount=?, name=?, location=?  WHERE rowid=?',
             (item['category'], item['date'], item['amount'], item['name'], item['location'], rowid,))
  return createResponse(200, item)

def createResponse(status, body):
  response = HTTPResponse(status=status, body=body)
  if not body is None:
    response.content_type = 'application/json; charset=utf-8'
  return response

@error(404)
def error_404_handler(e):
    return createResponse(404, json.dumps({'Error': {'Message': e.status_line, 'Status': e.status_code}}))

if __name__ == '__main__':
    from bottle import install, run
    from wtplugin import WtDbPlugin, WtCorsPlugin

    install(WtDbPlugin())
    install(WtCorsPlugin())
    run(host='localhost', port=8081, reloader=True, debug=True, autojson=False)
