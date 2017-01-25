from bottle import response, error, get
import json

@get('/items')
def items(db):
    db.execute("SELECT * FROM items")
    names = db.fetchall()
    return json.dumps(names)

@get('/items/<ROWID>')
def getOne(db):
  db.execute("SELECT * FROM items WHERE rowid")
  name = db.fetchone()
  return json.dumps(names)
	

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
