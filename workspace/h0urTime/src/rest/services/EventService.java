package rest.services;

import java.sql.SQLException;
import java.util.List;

import javax.ws.rs.Consumes;
import javax.ws.rs.GET;
import javax.ws.rs.POST;
import javax.ws.rs.Path;
import javax.ws.rs.Produces;
import javax.ws.rs.core.MediaType;
import javax.ws.rs.core.Response;
import javax.ws.rs.core.Response.ResponseBuilder;
import javax.ws.rs.core.Response.Status;

import dao.EventsDao;
import exceptions.DbException;
import exceptions.ServiceException;
import model.DbConnection;
import model.Events;

@Path("/eventservice")
public class EventService {

	@GET
	@Path("/loadAll")
	@Produces(MediaType.APPLICATION_JSON)
	public Response getAll() { 
		
		ResponseBuilder responseBuilder = null;
		DbConnection conn = null;
		
		try {
			conn = DbConnection.getInstance();
			EventsDao dao = new EventsDao(conn);
			List<Events> list = dao.loadAll();
			responseBuilder = Response.status(Status.OK).entity(list);
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
	public Response createEvent(Events entity) throws Exception {
		
		ResponseBuilder responseBuilder = null;
		DbConnection conn = null;
		
		try {
			conn = DbConnection.getInstance();
			EventsDao dao = new EventsDao(conn);
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
	public Response deleteEvent(Events entity) throws Exception {
		
		ResponseBuilder responseBuilder = null;
		DbConnection conn = null;
		
		try {
			conn = DbConnection.getInstance();
			EventsDao dao = new EventsDao(conn);
			dao.delete(entity.getEventid());
			
			// Response is needed to avoid "XML Parsing Error: no root element found"
			String jsonString = "{ \"deleted\": \"" + entity.getEventid() + "\"}";
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
	
	@POST
	@Path("/update")
	@Consumes(MediaType.APPLICATION_JSON)
	@Produces(MediaType.APPLICATION_JSON)
	public Response updateEvent(Events entity) throws Exception {
		
		ResponseBuilder responseBuilder = null;
		DbConnection conn = null;
		
		try {
			conn = DbConnection.getInstance();
			EventsDao dao = new EventsDao(conn);
			entity = dao.update(entity);
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

}
