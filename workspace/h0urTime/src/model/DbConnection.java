package model;

import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.SQLException;

public class DbConnection {

	// please set here the folder/filename of the sqlite database file
	// path separator is an SLASH!!!
	private String connectionStr = "jdbc:sqlite:/tmp/sample.db";
	
	// the connection object itself
	private Connection connection = null;
	
	// the singleton static instance of the connection
	private static DbConnection instance;
	
	// private constructor
	private DbConnection() throws SQLException, ClassNotFoundException {
		// load the class file / connect the jar
		Class.forName("org.sqlite.JDBC");
		// create connection
		this.connection = DriverManager.getConnection(this.connectionStr);
	}
	
	// connection getter
	public Connection getConnection() {
		return this.connection;
	}
	
	// checks if connection is open
	public boolean hasConnection() {
		if (instance == null) 
			return false;
		
		try {
			if (instance.getConnection().isClosed()) 
				return false;
		} catch (SQLException e) {
			// if statement produces exception, we have no connection
			return false;
		}
		
		return true;
	}
	
	// close the connection
	@SuppressWarnings("static-access")
	public void close() {
		// if we have an open connection, close it
		if (!this.hasConnection()) {
			try {
				instance.getConnection().close();
			} catch (Exception e) {
				// dont bother
			}
		}
		// set attributes to null
		this.instance = null;
		this.connection = null;
	}
	
	// create instance
	public static DbConnection getInstance() throws SQLException {
		try {
			if (instance == null) {
				instance = new DbConnection();
			} else if (instance.getConnection().isClosed()) {
				instance = new DbConnection();
			}
		} catch (ClassNotFoundException e) {
			throw new SQLException("Database connection creation failed", e);
		}
		return instance;
	}
}
