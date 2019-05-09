/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package init;

import java.sql.Connection;
import java.sql.SQLException;
import java.sql.Statement;
import java.util.logging.Level;
import java.util.logging.Logger;
import service.DBConnection;

/**
 *
 * @author Arthur
 */
public class CreateTableSQL {
    public static void DropAllTables(Connection conn){
        String sqlU="DROP TABLE USERS";
        String sqlA="DROP TABLE ASSEMBLIES";
        String sqlP="DROP TABLE PARTICIPANTS";
        String sqlS="DROP TABLE SURVEYS";
        try {
            conn = DBConnection.Connection();
            Statement stmt=conn.createStatement();
            stmt.execute("DROP TABLE USERS");
            stmt.execute("DROP TABLE ASSEMBLIES");
            stmt.execute("DROP TABLE PARTICIPANTS");
            stmt.execute("DROP TABLE SURVEYS");
        } catch (ClassNotFoundException | SQLException | InstantiationException | IllegalAccessException ex) {
            Logger.getLogger(CreateTableSQL.class.getName()).log(Level.SEVERE, null, ex);
        }
        
        
    }
    public static void CreateTables(Connection conn) throws SQLException{
        CreateUsers(conn);
        CreateAssemblies(conn);
        CreateParticipants(conn);
        CreateSurveys(conn);
    }
    public static void CreateUsers(Connection conn) throws SQLException{
        Statement stmt = conn.createStatement();
         String sql = "CREATE TABLE USERS ( ID_USER INT NOT NULL GENERATED ALWAYS AS IDENTITY (START WITH 1, INCREMENT BY 1), "
                 + "EMAIL VARCHAR(255) NOT NULL, PSEUDO VARCHAR(255) NOT NULL, PASSWORD VARCHAR(255) NOT NULL,PRIMARY KEY (ID_USER))";
         stmt.execute(sql);
            /*PreparedStatement preparedStatement = conn.prepareStatement(sql);   
            preparedStatement.executeUpdate();*/
    }
    public static void CreateAssemblies(Connection conn) throws SQLException{
        Statement stmt = conn.createStatement();
         String sql = "CREATE TABLE ASSEMBLIES( ID_ASSEMBLY INT NOT NULL GENERATED ALWAYS AS IDENTITY (START WITH 1, INCREMENT BY 1), "
                 + "TITLE VARCHAR(255) NOT NULL,DESCRIPTION VARCHAR(255) NOT NULL, DATE_TIME VARCHAR(255) NOT NULL, RADIO INT NOT NULL, "
                 + "COLOUR VARCHAR(255) NOT NULL, LATITUDE DOUBLE NOT NULL, LONGITUDE DOUBLE NOT NULL, PRIMARY KEY (ID_ASSEMBLY))";
         stmt.execute(sql);
          //  PreparedStatement preparedStatement = conn.prepareStatement(sql);   
            //preparedStatement.executeUpdate();
    }
    public static void CreateParticipants(Connection conn) throws SQLException{
        Statement stmt = conn.createStatement();
         String sql = "CREATE TABLE PARTICIPANTS( ID_PARTICIPANT INT NOT NULL GENERATED ALWAYS AS IDENTITY (START WITH 1, INCREMENT BY 1), "
                 + "ID_USER INT NOT NULL UNIQUE,ID_ASSEMBLY INT NOT NULL, STATUS INT NOT NULL, LATITUDE DOUBLE NOT NULL, "
                 + "LONGITUDE DOUBLE NOT NULL,PRIMARY KEY (ID_PARTICIPANT),FOREIGN KEY (ID_USER) REFERENCES USERS(ID_USER),"
                 + "FOREIGN KEY (ID_ASSEMBLY) REFERENCES ASSEMBLIES(ID_ASSEMBLY))";
        stmt.execute(sql);            
        //PreparedStatement preparedStatement = conn.prepareStatement(sql);   
                    //preparedStatement.executeUpdate();
    }
    public static void CreateSurveys(Connection conn) throws SQLException{
         Statement stmt = conn.createStatement();
         String sql = "CREATE TABLE SURVEYS( ID_SURVEY INT NOT NULL GENERATED ALWAYS AS IDENTITY (START WITH 1, INCREMENT BY 1), "
                 + "QUESTION VARCHAR(255) NOT NULL ,CHOICES VARCHAR(255) NOT NULL,DURATION INT NOT NULL, PRIMARY KEY(ID_SURVEY))";
         stmt.execute(sql); 
            //PreparedStatement preparedStatement = conn.prepareStatement(sql);   
            //preparedStatement.executeUpdate();
    }
    
    public static void main (String[] args) throws SQLException{
        Connection conn;
        try {
            conn = DBConnection.Connection();
            CreateTables(conn);
        } catch (ClassNotFoundException | InstantiationException | IllegalAccessException ex) {
            Logger.getLogger(CreateTableSQL.class.getName()).log(Level.SEVERE, null, ex);
        }
    }
}