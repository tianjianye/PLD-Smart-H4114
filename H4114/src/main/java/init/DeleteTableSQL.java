/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package init;

import static init.CreateTableSQL.CreateAssemblies;
import static init.CreateTableSQL.CreateParticipants;
import static init.CreateTableSQL.CreateSurveys;
import static init.CreateTableSQL.CreateTables;
import static init.CreateTableSQL.CreateUsers;
import static init.CreateTableSQL.existe;
import java.sql.Connection;
import java.sql.DatabaseMetaData;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.sql.Statement;
import java.util.logging.Level;
import java.util.logging.Logger;
import service.DBConnection;

/**
 *
 * @author Arthur
 */
public class DeleteTableSQL {
    public static void DeleteTables(Connection conn) throws SQLException{
        DeleteUsers(conn);
        DeleteAssemblies(conn);
        DeleteParticipants(conn);
        DeleteSurveys(conn);
    }
        
    public static void DeleteUsers(Connection conn) throws SQLException{
        if(existe(conn,"USERS")){
            Statement stmt = conn.createStatement();
            String sql = "DROP TABLE USERS";
            stmt.executeUpdate(sql);
        }
    }
    public static void DeleteAssemblies(Connection conn) throws SQLException{
        if(existe(conn,"ASSEMBLIES")){
            Statement stmt = conn.createStatement();
            String sql = "DROP TABLE ASSEMBLIES";
            stmt.executeUpdate(sql);
        }
    }
    public static void DeleteParticipants(Connection conn) throws SQLException{
        
        if(existe(conn,"PARTICIPANTS")){
            Statement stmt = conn.createStatement();
            String sql = "DROP TABLE PARTICIPANTS";
            stmt.executeUpdate(sql);
        }            
    }
    public static void DeleteSurveys(Connection conn) throws SQLException{
        if(existe(conn,"SURVEYS")){
            Statement stmt = conn.createStatement();
            String sql = "DROP TABLE SURVEYS";
            stmt.executeUpdate(sql);
        }
    }
    public static void main (String[] args) throws SQLException{
        Connection conn;
        try {
            conn = DBConnection.Connection();
            DeleteTables(conn);
        } catch (ClassNotFoundException | InstantiationException | IllegalAccessException ex) {
            Logger.getLogger(CreateTableSQL.class.getName()).log(Level.SEVERE, null, ex);
        }
    }
    
    public static boolean existe(Connection connection, String nomTable) throws SQLException{
	boolean existe;
	DatabaseMetaData dmd = connection.getMetaData();
        try (ResultSet tables = dmd.getTables(connection.getCatalog(),null,nomTable,null)) {
            existe = tables.next();
        }
        return existe;	
    }
}