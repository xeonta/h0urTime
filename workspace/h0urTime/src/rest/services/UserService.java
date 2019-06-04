package rest.services;

import java.sql.SQLException;

import javax.ws.rs.Consumes;
import javax.ws.rs.GET;
import javax.ws.rs.POST;
import javax.ws.rs.Path;
import javax.ws.rs.Produces;
import javax.ws.rs.core.MediaType;
import javax.ws.rs.core.Response;
import javax.ws.rs.core.Response.ResponseBuilder;
import javax.ws.rs.core.Response.Status;

import exceptions.DbException;
import exceptions.ServiceException;
import model.DbConnection;
import model.User;
import dao.UserDao;

@Path("/userservice")
public class UserService {

	@GET
	@Path("/loadById")
	@Produces(MediaType.APPLICATION_JSON)
	public Response getById(int userid) { 
		
		ResponseBuilder responseBuilder = null;
		DbConnection conn = null;
		
		try {
			conn = DbConnection.getInstance();
			UserDao dao = new UserDao(conn);
			
			User entity = dao.loadById(userid);
			
			responseBuilder = Response.status(Status.OK).entity(entity);
		} catch (DbException | SQLException e) {
			e.printStackTrace();
			ServiceException se = new ServiceException("An error occured.", e);
			responseBuilder = Response.status(Status.INTERNAL_SERVER_ERROR).entity(se.toJSON());
		} finally { 
			conn.close();
		}
		return responseBuilder.build();
	}
	
	@POST
	@Path("/create")
	@Consumes(MediaType.APPLICATION_JSON)
	@Produces(MediaType.APPLICATION_JSON)
	public Response createUser(User entity) throws Exception {
		
		ResponseBuilder responseBuilder = null;
		DbConnection conn = null;
		
		try {
			conn = DbConnection.getInstance();
			UserDao dao = new UserDao(conn);
			entity = dao.insert(entity);
			responseBuilder = Response.status(Status.OK).entity(entity);
		} catch (DbException | SQLException e) {
			e.printStackTrace();
			ServiceException se = new ServiceException("An error occured.", e);
			responseBuilder = Response.status(Status.INTERNAL_SERVER_ERROR).entity(se.toJSON());
		} finally { 
			conn.close();
		}
		
		return responseBuilder.build();
	}
	
	@POST
	@Path("/delete")
	@Consumes(MediaType.APPLICATION_JSON)
	@Produces(MediaType.APPLICATION_JSON)
	public Response deleteUser(User entity) throws Exception {
		
		ResponseBuilder responseBuilder = null;
		DbConnection conn = null;
		
		try {
			conn = DbConnection.getInstance();
			UserDao dao = new UserDao(conn);
			dao.delete(entity.getUserid());
			
			// Response is needed to avoid "XML Parsing Error: no root element found"
			String jsonString = "{ \"deleted\": \"" + entity.getUserid() + "\"}";
			responseBuilder = Response.status(Status.OK).entity(jsonString);
		} catch (DbException | SQLException e) {
			e.printStackTrace();
			ServiceException se = new ServiceException("An error occured.", e);
			responseBuilder = Response.status(Status.INTERNAL_SERVER_ERROR).entity(se.toJSON());
		} finally { 
			conn.close();
		}
		
		return responseBuilder.build();
	}
	
}
