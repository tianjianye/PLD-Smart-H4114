/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.insalyon.votewithbchain;

import model.Survey;
import com.insalyon.user.*;
import com.google.gson.*;
import java.io.IOException;
import java.io.PrintWriter;
import java.sql.Connection;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.sql.Statement;
import java.util.ArrayList;
import java.util.logging.Level;
import java.util.logging.Logger;
import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import service.DBConnection;

/**
 *
 * @author Arthur
 */
@WebServlet(name = "ActionServlet", urlPatterns = {"/ActionServlet3"})
public class ActionServlet extends HttpServlet {

    private ArrayList<Survey> surveys = new ArrayList<Survey>(); 
    /**
     * Processes requests for both HTTP <code>GET</code> and <code>POST</code>
     * methods.
     *
     * @param request servlet request
     * @param response servlet response
     * @throws ServletException if a servlet-specific error occurs
     * @throws IOException if an I/O error occurs
     */
    @Override
    protected void service(HttpServletRequest request, HttpServletResponse response)
            throws ServletException, IOException {
        response.setContentType("text/html;charset=UTF-8");
        String action=request.getParameter("action"); 
        Connection conn=null;
        switch(action){                
            case "createSurvey":
                    {
                        try {
                            conn = DBConnection.Connection();  
                            String question=(String)request.getParameter("question");
                            String [] responses = request.getParameterValues("responses");
                            String time =(String)request.getParameter("time");
                            Survey survey = new Survey(question);
                            for (int i = 0; i < responses.length; i++)
                            {
                                survey.addResponseChoice(responses[0]);
                            }  
                    
                            survey.setTimeMillis(Long.parseLong(time, 10));
                            this.surveys.add(survey);
                            request.getSession().setAttribute("serveyCreator", this.surveys);
                            
                            
                        } catch (ClassNotFoundException ex) {
                            Logger.getLogger(ActionServlet.class.getName()).log(Level.SEVERE, null, ex);
                        } catch (SQLException ex) {
                            Logger.getLogger(ActionServlet.class.getName()).log(Level.SEVERE, null, ex);
                        }
                    }
                    
                
            break;
            case "startSurvey":
                Survey survey = (Survey) request.getSession().getAttribute("serveyCreator");
                survey.start();
            break;
            case "answereSurvey":
                
            break;
            case "contestPoll":
            break;
            default:
            }
    }

    // <editor-fold defaultstate="collapsed" desc="HttpServlet methods. Click on the + sign on the left to edit the code.">
    /**
     * Handles the HTTP <code>GET</code> method.
     *
     * @param request servlet request
     * @param response servlet response
     * @throws ServletException if a servlet-specific error occurs
     * @throws IOException if an I/O error occurs
     */
    @Override
    protected void doGet(HttpServletRequest request, HttpServletResponse response)
            throws ServletException, IOException {
        service(request, response);
    }

    /**
     * Handles the HTTP <code>POST</code> method.
     *
     * @param request servlet request
     * @param response servlet response
     * @throws ServletException if a servlet-specific error occurs
     * @throws IOException if an I/O error occurs
     */
    @Override
    protected void doPost(HttpServletRequest request, HttpServletResponse response)
            throws ServletException, IOException {
        service(request, response);
    }

    /**
     * Returns a short description of the servlet.
     *
     * @return a String containing servlet description
     */
    @Override
    public String getServletInfo() {
        return "Short description";
    }// </editor-fold>

}
