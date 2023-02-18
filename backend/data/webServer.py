import asyncio
#import ast # now not use
# >>> ast.literal_eval("{'muffin' : 'lolz', 'foo' : 'kitty'}")
import tornado.web
import time
import sqlite3
import json


PORT = 8090


class MainHandler(tornado.web.RequestHandler):
    def get(self):
        self.write("Hello, world")


class ExgaHandler(tornado.web.RequestHandler):
    def prepare(self):
        # inspect request arguments
        # print(self.request.arguments)
        self.con = sqlite3.connect("Exgauster.db")
        pass

    def get(self):
        self.make3()
        self.about('GET')

    def put(self):
        self.about('PUT')
        
    def post(self):
        self.about('POST')

    def make3(self):
        cur = self.con.execute("SELECT * FROM moments ORDER BY timeId DESC LIMIT 3")
        timeIds = []
        # select last minutes
        for rec in cur:
            timeIds.append(rec)
        # load names
        cur = self.con.execute("SELECT * FROM names")
        names = {}
        for rec in cur:
            names[rec[0]] = rec[1]
        # load values
        answer = []
        for timeId in  timeIds:
            minute = {"moment": timeId[1]}
            
            cur = self.con.execute("SELECT * FROM data WHERE timeId = %i" % timeId[0])
            for rec in cur:
                minute[names[rec[2]]] = rec[3]
            answer.append(minute)
        self.write(json.dumps(answer, indent=4))
                
        
    def about(self, method):
        s = 'method ' + method
        # self.write(s)
        print(s)
        self.con.close()

def make_app():
    return tornado.web.Application([
        (r"/", MainHandler),
        (r"/exga/", ExgaHandler),
        (r"/exga", ExgaHandler),
        (r"/exga.json", ExgaHandler),
    ])


async def main():
    app = make_app()
    app.listen(PORT)
    await asyncio.Event().wait()

def start():
    print("server started %i" % PORT)
    asyncio.run(main())
    
if __name__ == "__main__":
    start()
