package rest.services;

import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.ResultSet;
import java.sql.Statement;
import java.util.Vector;

import javax.ws.rs.Consumes;
import javax.ws.rs.GET;
import javax.ws.rs.POST;
import javax.ws.rs.Path;
import javax.ws.rs.Produces;
import javax.ws.rs.core.MediaType;
import javax.ws.rs.core.Response;

import model.Category;

@Path("categoryservice")
public class CategoryService {

	private Connection getConnection() throws Exception {

		//Driver error?
		//Class.forName("org.sqlite.JDBC");

		String sqliteDatabasePath = "C:\\temp\\eventcalendar.sqlite";

		Connection connection = DriverManager.getConnection("jdbc:sqlite" + sqliteDatabasePath);
		return connection;

	}
	
	@POST
	@Consumes(MediaType.APPLICATION_JSON)
	public Response AddEvent(Category category) throws Exception {
		
		Connection connection = getConnection();
		Statement sth = connection.createStatement();
		
		String query = String.format("INSERT INTO Events (name) VALUES (\"%s\")", category.getName());
		
		sth.execute(query);
		
		return Response.ok().build();
		
	}
	
	@GET
	@Path("category.json")
	@Produces(MediaType.APPLICATION_JSON)
	public Response getCategories() throws Exception {
		Vector<Category> entries = getCategoriesFromDb();
		
		return Response.status(200).entity(entries).build();
	}
	
	private Vector<Category> getCategoriesFromDb() throws Exception {
		Connection connection = getConnection();
    	Statement sth = connection.createStatement();
    	
    	ResultSet rs = sth.executeQuery("SELECT * FROM Entries ORDER BY ROWID DESC");
    	Vector<Category> entries = new Vector<Category>();
    	while(rs.next()) {
    		Category entry = new Category(rs.getInt("id"), rs.getString("name"));
    		entries.add(entry);
    	}
		return entries;
	}
}
