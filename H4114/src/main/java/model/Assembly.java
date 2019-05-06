/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package model;

import java.util.ArrayList;

/**
 *
 * @author avianey
 */
public class Assembly {
    
    private ArrayList<Participant> participants; 
    private ArrayList<Survey> pastSurveys; 
    private Survey currentSurvey;
    
    
    public Assembly() 
    {
           currentSurvey = null;
    }

    public Survey getCurrentSurvey() 
    {
        return currentSurvey;
    }
    
    public void addSurvey(Survey survey)
    {
        if (currentSurvey != null || currentSurvey.stat == 2)
        {
            currentSurvey = survey;
        }
    }
    
    public void startSurvey()
    {
         if (currentSurvey != null && currentSurvey.stat == 1)
        {
            currentSurvey.start();
        }
    }
    
    public void addParticipant(Participant participant)
    {
        this.participants.add(participant);
    }
    
}
