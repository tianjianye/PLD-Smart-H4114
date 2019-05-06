/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package model;

/**
 *
 * @author avianey
 */
public class Participant {
    
    User user;
    Assembly assembly;
    int statut;
    long longitude;
    long latitude;
    
    public Participant(User user, Assembly assembly) 
    {
          assembly.addParticipant(this);
    }
}
