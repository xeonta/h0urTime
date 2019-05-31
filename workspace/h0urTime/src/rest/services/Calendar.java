package rest.services;

import java.net.URI;
import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.ResultSet;
import java.sql.Statement;
import java.util.Hashtable;
import java.util.Vector;

import javax.ws.rs.FormParam;
import javax.ws.rs.GET;
import javax.ws.rs.POST;
import javax.ws.rs.Path;
import javax.ws.rs.QueryParam;
import javax.ws.rs.core.Response;

import org.glassfish.jersey.server.mvc.Viewable;

import model.Events;

@Path("calendarservice")
public class Calendar {

	private Connection getConnection() throws Exception {
		
		//Driver error?
		//Class.forName("org.sqlite.JDBC");
		
		String sqliteDatabasePath = "C:\\temp\\eventcalendar.sqlite";
		
		Connection connection = DriverManager.getConnection("jdbc:sqlite" + sqliteDatabasePath);
		return connection;
		
	}
	
	@GET
	public Viewable Template() throws Exception {
		Connection connection = getConnection();
		Statement sth = connection.createStatement();
		
		ResultSet rs = sth.executeQuery("SELECT * FROM Events ORDER BY eventid DESC");
		Vector<Events> events = new Vector<Events>();
		while(rs.next()) {
			Events event = new Events(rs.getInt("eventid"), rs.getInt("userid"), rs.getDate("datestart"), rs.getDate("datestop"), rs.getString("title"), rs.getString("description"), rs.getInt("categoryid"));
			events.add(event);
		}
		
		Hashtable<String, Object> model = new Hashtable<String, Object>();
		model.put("events", events);
		
		return new Viewable("calendarservice", model);
		
	}
		
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