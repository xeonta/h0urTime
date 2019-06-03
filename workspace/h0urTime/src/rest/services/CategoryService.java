package rest.services;

import java.sql.SQLException;
import java.util.List;

import javax.ws.rs.Consumes;
import javax.ws.rs.FormParam;
import javax.ws.rs.GET;
import javax.ws.rs.POST;
import javax.ws.rs.Path;
import javax.ws.rs.PathParam;
import javax.ws.rs.Produces;
import javax.ws.rs.core.MediaType;
import javax.ws.rs.core.Response;
import javax.ws.rs.core.Response.ResponseBuilder;
import javax.ws.rs.core.Response.Status;

import exceptions.DbException;
import exceptions.ServiceException;
import model.Category;
import model.DbConnection;
import dao.CategoryDao;

@Path("/categoryservice")
public class CategoryService {

	@GET
	@Path("/loadAll")
	@Produces(MediaType.APPLICATION_JSON)
	public Response getAll() { 
		
		ResponseBuilder responseBuilder = null;
		DbConnection conn = null;
		
		try {
			conn = DbConnection.getInstance();
			CategoryDao dao = new CategoryDao(conn);
			List<Category> list = dao.loadAll();
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
	public Response createCategory(Category entity) throws Exception {
		
		ResponseBuilder responseBuilder = null;
		DbConnection conn = null;
		
		try {
			conn = DbConnection.getInstance();
			CategoryDao dao = new CategoryDao(conn);
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
	public Response deleteCategory(Category category) throws Exception {
		
		ResponseBuilder responseBuilder = null;
		DbConnection conn = null;
		
		try {
			// Response is needed to avoid "XML Parsing Error: no root element found"
			String jsonString = "{ \"deleted\": \"" + category.getCategoryid() + "\"}";
			conn = DbConnection.getInstance();
			CategoryDao dao = new CategoryDao(conn);
			dao.delete(category.getCategoryid());
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
	public Response updateCategory(Category entity) throws Exception {
		
		ResponseBuilder responseBuilder = null;
		DbConnection conn = null;
		
		try {
			conn = DbConnection.getInstance();
			CategoryDao dao = new CategoryDao(conn);
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
