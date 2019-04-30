/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.insalyon.videostream;
import com.google.gson.Gson;
import java.util.logging.Logger;
 
import javax.websocket.CloseReason;
import javax.websocket.OnClose;
import javax.websocket.OnMessage;
import javax.websocket.OnOpen;
import javax.websocket.Session;
import javax.websocket.server.ServerEndpoint;

import java.io.IOException;
import java.util.HashMap;
import java.util.Set;
import java.util.concurrent.CopyOnWriteArraySet;
import javax.json.JsonObject;
import javax.websocket.EncodeException;
import javax.websocket.server.PathParam;
/**
 *
 * @author scheah
 */

@ServerEndpoint(value = "/video/{room}/{usertype}")
public class ServerEndPoint {
    private Session session;
    private String roomNumber;
    private Logger logger = Logger.getLogger(this.getClass().getName());
    private static HashMap<String, Set<ServerEndPoint> > serverEndPoints = new HashMap<String, Set<ServerEndPoint> >();
 
    @OnOpen
    public void onOpen(Session session, @PathParam("usertype") String usertype, @PathParam("room") String roomNumber) throws IOException {
        logger.info("Connected ... " + session.getId());
        this.session = session;
        this.roomNumber = roomNumber;
        if (usertype.equals("start")) {
            serverEndPoints.put(roomNumber, new CopyOnWriteArraySet<ServerEndPoint> ());
        }
        else {
            serverEndPoints.get(roomNumber).add(this);
        }
    }
 
    @OnMessage
    public String onMessage(String message, Session session) throws IOException, EncodeException {
        JsonObject json = new Gson().fromJson(message, JsonObject.class);
        if (json != null) {
            String userType = json.getString("user");
            String type = json.getString("type");
            if ("bye".equals(type)) {
                System.out.println("user :" + session.getId() + " " + userType + " exit..");
                if(userType.equals("start")){
                    serverEndPoints.remove(roomNumber);
                }else{
                    serverEndPoints.get(roomNumber).remove(this);
                }
            }else if ("offer".equals(type)){
                if(userType.equals("start")){
                    broadcast(message);
                }else{
                    System.err.println("Wrong userType sent offer ");
                }
            }
        }
        return message;
    }
 
    @OnClose
    public void onClose(Session session, CloseReason closeReason) {
        logger.info(String.format("Session %s closed because of %s", session.getId(), closeReason));
    }
    
    private void broadcast(String message) throws IOException, EncodeException {
        for(ServerEndPoint endpoint : serverEndPoints.get(this.roomNumber)) {
            synchronized (endpoint) {
                try {
                    endpoint.session.getBasicRemote().sendObject(message);
                } catch (IOException | EncodeException e) {
                    e.printStackTrace();
                }
            }
        }
    }
}