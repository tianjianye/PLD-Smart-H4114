/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.insalyon.videostream;
import com.sun.xml.internal.ws.wsdl.writer.document.Message;
import java.util.logging.Logger;
 
import javax.websocket.CloseReason;
import javax.websocket.OnClose;
import javax.websocket.OnMessage;
import javax.websocket.OnOpen;
import javax.websocket.Session;
import javax.websocket.CloseReason.CloseCodes;
import javax.websocket.server.ServerEndpoint;

import java.io.IOException;
import java.util.HashMap;
import java.util.Set;
import java.util.concurrent.CopyOnWriteArraySet;
import javax.websocket.EncodeException;
import javax.websocket.server.PathParam;
/**
 *
 * @author scheah
 */

@ServerEndpoint(value = "/video/{room}/{usertype}")
public class ServerEndPoint {
    private Session session;
    private Logger logger = Logger.getLogger(this.getClass().getName());
    private static HashMap<String, Set<ServerEndPoint> > serverEndPoints = new HashMap<String, Set<ServerEndPoint> >();
 
    @OnOpen
    public void onOpen(Session session, @PathParam("usertype") String usertype, @PathParam("room") String roomNumber) throws IOException {
        logger.info("Connected ... " + session.getId());
        this.session = session;
        if (usertype.equals("Start")) {
            serverEndPoints.put(roomNumber, new CopyOnWriteArraySet<ServerEndPoint> ());
        }
        else {
            serverEndPoints.get(roomNumber).add(this);
        }
    }
 
    @OnMessage
    public String onMessage(String message, Session session) {
        switch (message) {
        case "quit":
            try {
                session.close(new CloseReason(CloseCodes.NORMAL_CLOSURE, "Streaming ended"));
            } catch (IOException e) {
                throw new RuntimeException(e);
            }
            break;
        }
        return message;
    }
 
    @OnClose
    public void onClose(Session session, CloseReason closeReason) {
        logger.info(String.format("Session %s closed because of %s", session.getId(), closeReason));
    }
    
    private static void broadcast(Message message, String roomNumber) throws IOException, EncodeException {
  
        for(ServerEndPoint endpoint : serverEndPoints)
            synchronized (endpoint) {
                try {
                    endpoint.session.getBasicRemote().
                      sendObject(message);
                } catch (IOException | EncodeException e) {
                    e.printStackTrace();
                }
            }
        });
    }
}