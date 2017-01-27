from bottle import response, error, get, request, post, delete, put
import json

@get('/items')
def get_items(db):
    db.execute("SELECT rowid, name, category, amount, date, location FROM items")
    names = db.fetchall()
    return json.dumps(names)

@get('/items/<rowid>')
def get_item(db, rowid=0):
  db.execute('SELECT * FROM items WHERE rowid=?', rowid)
  name = db.fetchone()
  return json.dumps(name)

@post('/items')
def post_items(db):
  item = json.load(request.body)
  db.execute("""INSERT INTO items (category, date, amount, name, location)
                VALUES (?, ?, ?, ?, ?)""",
             (item['category'], item['date'], item['amount'], item['name'], item['location']))

@delete('/item/<rowid>')
def delete_item(db, rowid):
  db.execute("""SELECT * FROM items WHERE rowid=?""", rowid)
  item = db.fetchone()
  db.execute("""DELETE FROM items WHERE rowid=?""", (rowid))
  return item

@put('/item/<rowid>')
def put_item(db, rowid):
  db.execute("""SELECT * FROM items WHERE rowid=?""", rowid)
  item = db.fetchone()
  item.update(json.load(request.body))
  db.execute("""UPDATE items SET
                category=?, date=?, amount=?, name=?, location=?
                WHERE rowid=?""",
             (item['category'], item['date'], item['amount'], item['name'], item['location'], rowid))

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
