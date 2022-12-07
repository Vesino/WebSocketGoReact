package main

import (
	"fmt"
	"log"
	"net/http"

	"github.com/gorilla/websocket"
)

var upgrader = websocket.Upgrader{
	ReadBufferSize:  1024,
	WriteBufferSize: 1024,
}

func main() {
	mux := http.NewServeMux()
	mux.HandleFunc("/ws", wsEndpoint)

	log.Fatal(http.ListenAndServe(":8080", mux))
}

func wsEndpoint(w http.ResponseWriter, r *http.Request) {
	upgrader.CheckOrigin = func(r *http.Request) bool {
		// origin := r.Header.Get("Origin")
		// return origin == "http://127.0.0.1:8080"
		return true
	}

	ws, err := upgrader.Upgrade(w, r, nil)
	if err != nil {
		log.Println("Error when stablish a connection", err)
	}
	reader(ws)

}

func reader(conn *websocket.Conn) {
	for {
		messageType, p, err := conn.ReadMessage()
		if err != nil {
			log.Println("Error reading a message", err.Error())
			return
		}
		fmt.Println("incoming message: " + string(p))
		if err := conn.WriteMessage(messageType, p); err != nil {
			log.Println(err)
			return
		}
	}
}
