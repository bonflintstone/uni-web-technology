from bottle import response, error, get, request, post, delete, put, HTTPResponse
import json

@get('/items')
def get_items(db):
  db.execute('SELECT * FROM items')
  items = json.dumps(db.fetchall())
<<<<<<< HEAD
  response.content_type = 'application/json' # response.content_type instead
  return HTTPResponse(status=200, body=items)
=======
  return createResponse(200, items)
>>>>>>> 31ed74ecaebf49993b5604cdc5322fdca6699964

@get('/item/<rowid>')
def get_item(db, rowid=0):
  db.execute('SELECT * FROM items WHERE rowid=?', rowid)
  item = json.dumps(db.fetchone())
<<<<<<< HEAD
  response.content_type = 'application/json charset=utf-8' # code after return will not get exectuted
  return HTTPResponse(status=200, body=item)
=======
  if item == 'null':
    return createResponse(404, '{error: item not found}')
  return createResponse(200, item)
>>>>>>> 31ed74ecaebf49993b5604cdc5322fdca6699964

@post('/items')
def post_items(db):
  item = json.load(request.body)
  db.execute('INSERT INTO items (category, date, amount, name, location) VALUES (?, ?, ?, ?, ?)',
             (item['category'], item['date'], item['amount'], item['name'],  item['location']))
  return createResponse(status=201, body=None)

@delete('/item/<rowid>')
def delete_item(db, rowid):
  db.execute('DELETE FROM items WHERE rowid=?', (rowid))
  return createResponse(200, None)

@put('/item/<rowid>')
def put_item(db, rowid):
  db.execute('SELECT * FROM items WHERE rowid=?', rowid)
  item = db.fetchone()
  item.update(json.load(request.body))
  db.execute('UPDATE items SET category=?, date=?, amount=?, name=?, location=?  WHERE rowid=?',
             (item['category'], item['date'], item['amount'], item['name'], item['location'], rowid))
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
