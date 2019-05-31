package rest.services;

import java.net.URI;
import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.Statement;

import javax.ws.rs.FormParam;
import javax.ws.rs.GET;
import javax.ws.rs.POST;
import javax.ws.rs.Path;
import javax.ws.rs.QueryParam;
import javax.ws.rs.core.Response;

//import org.glassfish.jersey.server.mvc.Viewable;

@Path("calendarservice")
public class Calendar {

	private Connection getConnection() throws Exception {
		
		//Driver error?
		//Class.forName("org.sqlite.JDBC");
		
		String sqliteDatabasePath = "C:\\temp\\eventcalendar.sqlite";
		
		Connection connection = DriverManager.getConnection("jdbc:sqlite" + sqliteDatabasePath);
		return connection;
		
	}
	
	/*
	@GET
	public Viewable Template() throws Exception {
		
	}
	*/
	
	@POST
	public Response AddEvent(@FormParam("eventid") String eventid) throws Exception {
		
		Connection connection = getConnection();
		Statement sth = connection.createStatement();
		
		String query = String.format("INSERT INTO Events (eventid) VALUES (\"%s\")", eventid);
		
		System.out.println("Sending Query=" + query);
		sth.execute(query);
		
		System.out.println("OK Userid=\" + userid + \"; ");
		URI redirectURI = new URI("calendarservice");
		return Response.seeOther(redirectURI).build();
		
	}
	
	@GET
	@Path("delete")
	public Response DeleteEvent(@QueryParam("eventid") int eventid) throws Exception {
		
		Connection connection = getConnection();
		Statement sth = connection.createStatement();
		
		sth.execute("DELETE FROM Events WHERE eventid = " + eventid);
		
		URI redirectURI = new URI("calendarservice");
		return Response.seeOther(redirectURI).build();		
	}
}
